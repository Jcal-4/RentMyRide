import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./GoogleMaps.css";
import * as carLocater from "../../store/carlocation";
import GoogleMapCars from "../GoogleMapsCars";
import Geocode from "react-geocode";
// END OF IMPORTS --------------------------------------------------------------------------------------------------------

const libraries = ["places"];

// options for the google map
const options = {
	fullscreenControl: false,
	zoomControl: true,
};
// styling added to the google map such as the size and width
const mapContainerStyle = {
	height: "93vh",
	width: "50vw",
	top: "7vh",
};
// the center is where the map will first load into (COME BACK AND EDIT THIS TO THE USERS SAVED ADDRESS)
const center = {
	lat: 40.73061,
	lng: -74.006,
};

// GOOGLE MAP COMPONENT (main render) --------------------------------------------------------------------------------
export default function GoogleMaps() {
	let cars = useSelector((state) => state.car.carsList);
	Geocode.setApiKey("AIzaSyC_6E8DK05Pld0jbbPYVvX1SIATom7GR6Q");
	// let addressesGeocode = []; // will store all the lat/lng in this array
	let addressesGeocode = [
		{ lat: 36.18794, lng: -115.05236 },
		{ lat: 36.12162, lng: -115.30318 },
		{ lat: 36.22216, lng: -115.28787 },
		{ lat: 36.22349, lng: -115.16928 },
		{ lat: 36.2036749, lng: -115.1526188 },
		{ lat: 33.9602649, lng: -118.3877674 },
		{ lat: 32.66367, lng: -116.27363 },
		{ lat: 34.049209, lng: -118.466374 },
	];
	// function geocodee(cars) {
	// 	cars.forEach((car) => {
	// 		Geocode.fromAddress(car.address).then(
	// 			(response) => {
	// 				const { lat, lng } = response.results[0].geometry.location;
	// 				addressesGeocode.push({ lat: `${lat}`, lng: `${lng}` });
	// 			},
	// 			(error) => {
	// 				console.error(error);
	// 			}
	// 		);
	// 	});
	// }
	// // console.log(cars[0].address);
	// geocodee(cars);
	// console.log(addressesGeocode);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyC_6E8DK05Pld0jbbPYVvX1SIATom7GR6Q",
		libraries,
	});
	const [markers, setMarkers] = React.useState([]);
	const [selected, setSelected] = React.useState(null);

	const onMapClick = React.useCallback((e) => {
		setMarkers((current) => [
			...current,
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(12);
	}, []);

	if (loadError) return "Error";
	if (!isLoaded) return "Loading...";

	return (
		<div className="mapContainer">
			<Locate panTo={panTo} />
			<Search panTo={panTo} />
			<GoogleMapCars />

			<GoogleMap
				id="map"
				mapContainerStyle={mapContainerStyle}
				zoom={11}
				options={options}
				center={center}
				onLoad={onMapLoad}
			>
				{addressesGeocode.map((marker) => (
					<Marker
						key={`${marker.lat}-${marker.lng}`}
						position={{ lat: marker.lat, lng: marker.lng }}
					/>
				))}
			</GoogleMap>
		</div>
	);
}
// LOCATE COMPONENT (compass geolocation) --------------------------------------------------------------------------------
function Locate({ panTo }) {
	return (
		<button
			className="locate"
			onClick={() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						panTo({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
					},
					() => null
				);
			}}
		>
			<img className="compass" src="/compass.svg" alt="compass" />
		</button>
	);
}
// SEARCH COMPONENT -----------------------------------------------------------------------------------------------------
function Search({ panTo }) {
	const dispatch = useDispatch();
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 43.6532, lng: () => -79.3832 },
			radius: 100 * 1000,
		},
	});

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

	const handleInput = (e) => {
		setValue(e.target.value);
	};

	// we might be able to return here to grab the input from the search box and query through our cars for which to render
	const handleSelect = async (address) => {
		console.log(address);
		let city = address.split(",");
		console.log(city[0]);
		dispatch(carLocater.getCars({ cityName: city }));
		setValue(address, false);
		clearSuggestions();
		// add the dispatch here to get the cars with the right locations

		try {
			const results = await getGeocode({ address });
			const { lat, lng } = await getLatLng(results[0]);
			panTo({ lat, lng });
		} catch (error) {
			console.log("Error!", error);
		}
	};

	return (
		<div className="searchMap">
			<Combobox onSelect={handleSelect}>
				<ComboboxInput
					value={value}
					onChange={handleInput}
					disabled={!ready}
					placeholder="Search your location"
				/>
				<ComboboxPopover>
					<ComboboxList>
						{status === "OK" &&
							data.map(({ id, description }) => (
								<ComboboxOption key={id} value={description} />
							))}
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</div>
	);
}
