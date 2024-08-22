import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import "leaflet/dist/leaflet.css";

import "../assets/styles/MapPage.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import PostForm from "../components/PostForm";
import usePost from "../usePost";

const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse?";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
	bottomleft: "leaflet-bottom leaflet-left",
	bottomright: "leaflet-bottom leaflet-right",
	topleft: "leaflet-top leaflet-left",
	topright: "leaflet-top leaflet-right",
};

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

function CreatePost() {
	const [location, setLocation] = useState(null);
	const map = useMap();
	const [section, setSection] = useState("location");
	const { data, error, fetchData } = usePost();

	const overlayRef = useRef();

	function handleSelectLocation() {
		const { lat, lng } = map.getCenter();
		const params = {
			lat: lat,
			lon: lng,
			format: "json",
		};
		const queryStr = new URLSearchParams(params);
		fetchData(`${NOMINATIM_REVERSE_URL}${queryStr}`, { method: "GET" });
		// const { lat, lng } = map.getCenter();
		// setPostMarkers((prev) => (prev = [...prev, [lat, lng]]));
		setSection("form");
		setLocation([lat, lng]);
		overlayRef.current.style.zIndex = "9999";
	}
	return (
		<div
			className="overlay-wrapper"
			style={{
				position: "absolute",
				display: "flex",
				width: "100%",
				height: "100%",
				zIndex: "500",
				alignItems: "center",
				justifyContent: "center",
			}}
			ref={overlayRef}
		>
			{section === "location" || error ? (
				<>
					<FontAwesomeIcon
						icon={faLocationDot}
						color="red"
						fontSize={"2.6rem"}
						style={{ zIndex: "1000" }}
					/>
					<div className="buttons-wrapper">
						<h2 style={{ textAlign: "center" }}>Pilih Lokasi</h2>
						<div style={{ display: "flex", gap: "1rem" }}>
							<button type="button" className="btn-sc contain">
								Batalkan {/* Routing balik ke home page*/}
							</button>
							<button
								type="button"
								className="btn-pr contain"
								onClick={handleSelectLocation}
							>
								Konfirmasi
							</button>
						</div>
					</div>
				</>
			) : data ? (
				<PostForm addressName={data.display_name} coordinate={location} />
			) : (
				<h4>loading</h4>
			)}
		</div>
	);
}

export default function MapPage() {
	const [postMarkers, setPostMarkers] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const [isCreatingPost, setIsCreatingPost] = useState(true);
	console.log(postMarkers, "postMarkers");

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
					{isCreatingPost && (
						<CreatePost
							setIsCreatingPost={setIsCreatingPost}
							setPostMarkers={setPostMarkers}
						/>
					)}
				</MapContainer>
			</main>
		</>
	);
}
