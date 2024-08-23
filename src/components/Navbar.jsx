import {
	faHome,
	faHomeUser,
	faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";

export default function Navbar() {
	const { setIsCreatingPost } = useContext(AppContext);

	return (
		<nav className="navbar-wrapper">
			<h2 className="navbar-logo">Bangun.ID</h2>
			<div style={{ display: "flex", gap: "2rem" }}>
				<NavLink
					to={"/home"}
					className="navbar-btn"
					onClick={() => {
						setIsCreatingPost(false);
					}}
				>
					<FontAwesomeIcon icon={faHome} fontSize={"1.3rem"} />
				</NavLink>
				<NavLink to={"/MapView"} className="navbar-btn">
					<FontAwesomeIcon icon={faMapLocationDot} fontSize={"1.3rem"} />
				</NavLink>
			</div>
		</nav>
	);
}
