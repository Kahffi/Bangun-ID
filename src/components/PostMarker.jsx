import { Marker } from "react-leaflet";

export default function PostMarker({ post, setOverlayData, setIsOverlayOpen }) {
	function handleClick(e) {
		setOverlayData(post);
		setIsOverlayOpen(true);
	}
	return (
		<Marker
			position={{ lat: post.location[0], lng: post.location[1] }}
			eventHandlers={{ click: handleClick }}
		></Marker>
	);
}
