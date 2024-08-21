import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import usePost from "../usePost";

const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search?";

function AddressBox({ address }) {
	return (
		<div className="address-box" style={{ cursor: "pointer" }}>
			<FontAwesomeIcon icon={faLocation} color="blue" />
			<p>{address}</p>
		</div>
	);
}

export default function SearchBox() {
	const { data, isPending, error, fetchData } = usePost();
	const { showResult, setShowResult } = useState(false);

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
	};

	// jika data berubah

	return (
		<div className="search-box">
			{console.log(data, "myboy")}
			<form className="search-bar" onSubmit={handleSearch}>
				<input type="search" placeholder="Cari alamat" name="search-value" />
				<button type="submit">Cari</button>
			</form>
			<div className="search-result">
				{data &&
					data.map((address) => {
						console.log(address);
						return (
							<AddressBox
								key={address.place_id}
								address={address.display_name}
							/>
						);
					})}
			</div>
		</div>
	);
}
