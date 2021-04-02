import React from "react";
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

const libraries = ["places"];

const options = {
	fullscreenControl: false,
	zoomControl: true,
};

const mapContainerStyle = {
	height: "91.75vh",
	width: "50vw",
};

const center = {
	lat: 36.169941,
	lng: -115.139832,
};

export default function GoogleMaps() {
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
		<div>
			<Locate panTo={panTo} />
			<Search panTo={panTo} />

			<GoogleMap
				id="map"
				mapContainerStyle={mapContainerStyle}
				zoom={11}
				options={options}
				center={center}
				onLoad={onMapLoad}
			></GoogleMap>
		</div>
	);
}

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

function Search({ panTo }) {
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

	const handleSelect = async (address) => {
		setValue(address, false);
		clearSuggestions();

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
