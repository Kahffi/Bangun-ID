import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostForm from "./PostForm";
import { useMap } from "react-leaflet";
import { useRef, useState } from "react";
import usePost from "../usePost";

const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse?";

export default function CreatePost() {
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
		<div className="overlay-wrapper" ref={overlayRef}>
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
