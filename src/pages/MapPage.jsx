import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import "leaflet/dist/leaflet.css";

import "../assets/styles/MapPage.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "leaflet";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
	bottomleft: "leaflet-bottom leaflet-left",
	bottomright: "leaflet-bottom leaflet-right",
	topleft: "leaflet-top leaflet-left",
	topright: "leaflet-top leaflet-right",
};

const userPositionIcon = new Icon();

function TrackLocationButton({ userPosition }) {
	const map = useMap();

	function toCurrentLocation() {
		console.log("clicked");

		userPosition && map.flyTo(userPosition, 16);
	}

	return (
		<div
			style={{ position: "absolute", bottom: "0", left: "0", zIndex: "1001" }}
		>
			<button
				type="button"
				className="btn-sc"
				onClick={toCurrentLocation}
				style={{ padding: ".4rem", borderRadius: "100%" }}
			>
				<FontAwesomeIcon icon={faLocation} color="white" fontSize={"1.6rem"} />
			</button>
		</div>
	);
}

function UserLocationMarker({ userLocation, setUserLocation }) {
	const map = useMap();

	useEffect(() => {
		map.locate().on("locationfound", (location) => {
			map.flyTo(location.latlng, 16);
			setUserLocation(location.latlng);
		});
	}, [map, setUserLocation]);

	return (
		userLocation && (
			<Marker position={userLocation}>
				{" "}
				<Popup>Lokasi anda</Popup>
			</Marker>
		)
	);
}

export default function MapPage() {
	const [userLocation, setUserLocation] = useState(null);

	return (
		<>
			<Navbar />
			<main className="map-wrapper">
				<MapContainer
					style={{ height: "100%" }}
					center={[-6.2, 106.816666]}
					zoom={13}
					scrollWheelZoom={true}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						className={POSITION_CLASSES.bottomleft}
					/>
					<SearchBox />
					<TrackLocationButton userPosition={userLocation} />
					<UserLocationMarker
						userLocation={userLocation}
						setUserLocation={setUserLocation}
					/>
				</MapContainer>
			</main>
		</>
	);
}
