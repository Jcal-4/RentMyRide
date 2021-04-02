import React from "react";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
	height: "91.75vh",
	width: "50vw",
};
// this is the location at which it will render on a load of the map
// lets try and make it so that this is the same at the users lat and lng
const center = {
	lat: 43.6532,
	lng: -79.3832,
};

function GoogleMaps() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyC_6E8DK05Pld0jbbPYVvX1SIATom7GR6Q",
		libraries,
	});

	if (loadError) return "Error";
	if (!isLoaded) return "Loading...";

	return (
		<div>
			<GoogleMap
				id="map"
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
			></GoogleMap>
		</div>
	);

	// const [markers, setMarkers] = React.useState([]);
	// const [selected, setSelected] = React.useState(null);

	// const onMapClick = React.useCallback((e) => {
	// 	setMarkers((current) => [
	// 		...current,
	// 		{
	// 			lat: e.latLng.lat(),
	// 			lng: e.latLng.lng(),
	// 			time: new Date(),
	// 		},
	// 	]);
	// }, []);

	// 	const mapRef = React.useRef();
	// 	const onMapLoad = React.useCallback((map) => {
	// 		mapRef.current = map;
	// 	}, []);

	// 	const panTo = React.useCallback(({ lat, lng }) => {
	// 		mapRef.current.panTo({ lat, lng });
	// 		mapRef.current.setZoom(14);
	// 	}, []);

	// return (
	// 	<div>
	// 		<h1>
	// 			Bears{" "}
	// 			<span role="img" aria-label="tent">
	// 				⛺️
	// 			</span>
	// 		</h1>

	// 		<Locate panTo={panTo} />
	// 		<Search panTo={panTo} />

	// 		<GoogleMap
	// 			id="map"
	// 			mapContainerStyle={mapContainerStyle}
	// 			zoom={8}
	// 			center={center}
	// 			options={options}
	// 			onClick={onMapClick}
	// 			onLoad={onMapLoad}
	// 		>
	// 			{markers.map((marker) => (
	// 				<Marker
	// 					key={`${marker.lat}-${marker.lng}`}
	// 					position={{ lat: marker.lat, lng: marker.lng }}
	// 					onClick={() => {
	// 						setSelected(marker);
	// 					}}
	// 					icon={{
	// 						url: `/bear.svg`,
	// 						origin: new window.google.maps.Point(0, 0),
	// 						anchor: new window.google.maps.Point(15, 15),
	// 						scaledSize: new window.google.maps.Size(30, 30),
	// 					}}
	// 				/>
	// 			))}

	// 			{selected ? (
	// 				<InfoWindow
	// 					position={{ lat: selected.lat, lng: selected.lng }}
	// 					onCloseClick={() => {
	// 						setSelected(null);
	// 					}}
	// 				>
	// 					<div>
	// 						<h2>
	// 							<span role="img" aria-label="bear">
	// 								🐻
	// 							</span>{" "}
	// 							Alert
	// 						</h2>
	// 						<p>Spotted {formatRelative(selected.time, new Date())}</p>
	// 					</div>
	// 				</InfoWindow>
	// 			) : null}
	// 		</GoogleMap>
	// 	</div>
	// );
	// }

	// function Locate({ panTo }) {
	// 	return (
	// 		<button
	// 			className="locate"
	// 			onClick={() => {
	// 				navigator.geolocation.getCurrentPosition(
	// 					(position) => {
	// 						panTo({
	// 							lat: position.coords.latitude,
	// 							lng: position.coords.longitude,
	// 						});
	// 					},
	// 					() => null
	// 				);
	// 			}}
	// 		>
	// 			<img src="/compass.svg" alt="compass" />
	// 		</button>
	// 	);
	// }

	// function Search({ panTo }) {
	// 	const {
	// 		ready,
	// 		value,
	// 		suggestions: { status, data },
	// 		setValue,
	// 		clearSuggestions,
	// 	} = usePlacesAutocomplete({
	// 		requestOptions: {
	// 			location: { lat: () => 43.6532, lng: () => -79.3832 },
	// 			radius: 100 * 1000,
	// 		},
	// 	});

	// 	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

	// 	const handleInput = (e) => {
	// 		setValue(e.target.value);
	// 	};

	// 	const handleSelect = async (address) => {
	// 		setValue(address, false);
	// 		clearSuggestions();

	// 		try {
	// 			const results = await getGeocode({ address });
	// 			const { lat, lng } = await getLatLng(results[0]);
	// 			panTo({ lat, lng });
	// 		} catch (error) {
	// 			console.log("😱 Error: ", error);
	// 		}
	// 	};
}

export default GoogleMaps;
