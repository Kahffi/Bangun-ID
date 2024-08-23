import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import "leaflet/dist/leaflet.css";

import "../assets/styles/MapPage.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import CreatePost from "../components/CreatePost";
import PostMarker from "../components/PostMarker";
import Post from "../components/Post";

import UserIcon from "../assets/images/UserMarker.svg";
import { Icon } from "leaflet";
import { AppContext } from "../App";

// testing only
const post = {
	id: 1,
	title: "Jembatan rusak",
	user: "Doe John",
	description:
		"human gentle nature another tail largest pot there length negative naturally eye electric automobile stream eaten flag point everywhere serious vegetable result ride shine smile stiff sink softly throughout fair activity everybody spent belt gas degree peace wear thy mixture offer center either occasionally theory way young flower",
	location: [-6.21462, 106.84513],
};

function TrackLocationButton({ userPosition }) {
	const map = useMap();

	function toCurrentLocation() {
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

	const userIcon = new Icon({ iconUrl: UserIcon, iconSize: [40, 40] });

	useEffect(() => {
		map.locate().on("locationfound", (location) => {
			map.flyTo(location.latlng, 16);
			setUserLocation(location.latlng);
		});
	}, [map, setUserLocation]);

	return (
		userLocation && (
			<Marker position={userLocation} icon={userIcon}>
				<Popup>Lokasi anda</Popup>
			</Marker>
		)
	);
}

export default function MapPage() {
	// testing only
	const [posts, setPosts] = useState([{ ...post }]);

	const [postMarkers, setPostMarkers] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	// state untuk tracking user ketika membuat post
	const { isCreatingPost, setIsCreatingPost } = useContext(AppContext);

	// state untuk tracking marker di klik, menampilkan post
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	// data postingan dari marker yang diklik
	const [overlayData, setOverlayData] = useState(null);

	function closeOverlay() {
		setIsOverlayOpen(false);
	}

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

					{posts.length > 0 &&
						posts.map((p) => {
							return (
								<PostMarker
									key={p.id}
									post={p}
									setOverlayData={setOverlayData}
									setIsOverlayOpen={setIsOverlayOpen}
								/>
							);
						})}
				</MapContainer>
				{isOverlayOpen && (
					<div className="overlay-wrapper post-overlay">
						<button
							type="button"
							onClick={closeOverlay}
							style={{
								position: "absolute",
								top: "0",
								right: "0",
								background: "none",
								color: "white",
								paddingTop: "10px",
								paddingRight: "10px",
								fontSize: "1.3rem",
							}}
						>
							X
						</button>
						<Post post={overlayData} />
					</div>
				)}
			</main>
		</>
	);
}
