import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import "leaflet/dist/leaflet.css";

import "../assets/styles/MapPage.css";

export default function MapPage() {
	return (
		<>
			<Navbar />
			<main className="map-wrapper">
				<MapContainer
					style={{ height: "100%" }}
					center={[51.505, -0.09]}
					zoom={13}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<SearchBox />
					<Marker position={[51.505, -0.09]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			</main>
		</>
	);
}
