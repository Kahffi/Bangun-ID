import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import usePost from "../usePost";
import { useMap } from "react-leaflet";

const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search?";

function AddressBox({ address, searchResultRef, error }) {
	const map = useMap();
	function goToLocation() {
		map.setView([parseFloat(address.lat), parseFloat(address.lon)], 16);
		searchResultRef.current.classList.add("hidden");
	}

	console.log(address, "should be empty");

	return (
		<div
			className="address-box"
			style={{ cursor: "pointer" }}
			onClick={goToLocation}
		>
			<FontAwesomeIcon icon={faLocation} color="blue" fontSize={"1.1rem"} />
			<p>{address.display_name}</p>
		</div>
	);
}

export default function SearchBox() {
	const { data, isPending, error, fetchData } = usePost();
	const searchResultRef = useRef(null);

	const handleSearch = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const searchValue = formData.get("search-value");

		const params = {
			q: searchValue,
			format: "json",
			addressdetails: 1,
		};
		const queryStr = new URLSearchParams(params).toString();
		fetchData(`${NOMINATIM_SEARCH_URL}${queryStr}`, { method: "GET" });
		searchResultRef.current.classList.contains("hidden") &&
			searchResultRef.current.classList.remove("hidden");
	};

	useEffect(() => {
		searchResultRef.current.classList.add("hidden");
	}, [error]);

	return (
		<div className="search-box">
			<div className="wrapper">
				{console.log(data, "myboy")}
				<form className="search-bar" onSubmit={handleSearch}>
					<input type="search" placeholder="Cari alamat" name="search-value" />
					<button
						className="btn-pr "
						type="submit"
						style={{
							borderTopRightRadius: "10px",
							borderBottomRightRadius: "10px",
							padding: "0 .8rem",
						}}
					>
						Cari
					</button>
				</form>
				<div className="search-result" ref={searchResultRef}>
					{data &&
						data.map((address) => {
							console.log(address);
							return (
								<AddressBox
									key={address.place_id}
									address={address}
									searchResultRef={searchResultRef}
									error={error}
								/>
							);
						})}
					{data && data.length === 0 ? <em>Terjadi kesalahan</em> : null}
				</div>
			</div>
		</div>
	);
}
