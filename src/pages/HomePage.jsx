import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import "../assets/styles/Home.css";
import { Navigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../App";

const post = {
	title: "Jembatan rusak",
	user: "Doe John",
	description:
		"human gentle nature another tail largest pot there length negative naturally eye electric automobile stream eaten flag point everywhere serious vegetable result ride shine smile stiff sink softly throughout fair activity everybody spent belt gas degree peace wear thy mixture offer center either occasionally theory way young flower",
	location: [-6.21462, 106.84513],
};

export default function HomePage() {
	const [posts, setPosts] = useState([{ ...post }]);
	const location = useLocation();
	const { user } = useContext(AppContext);

	// state untuk tracking user ketika membuat post
	const { setIsCreatingPost, isCreatingPost } = useContext(AppContext);

	console.log(user);
	return (
		<>
			<Navbar />
			<main className="home-wrapper" style={{ position: "relative" }}>
				{posts.map((post, idx) => {
					console.log("am i running?");
					return (
						<>
							<Post key={post.title + idx} post={post} />
						</>
					);
				})}

				<div
					style={{
						position: "absolute",
						bottom: "0",
						right: "0",
						paddingRight: "30px",
						paddingBottom: "30px",
					}}
				>
					<button
						type="button"
						className="btn-pr"
						style={{ borderRadius: "100%", padding: ".4rem" }}
						onClick={(e) => {
							setIsCreatingPost(true);
						}}
					>
						<FontAwesomeIcon icon={faAdd} fontSize={"2.3rem"} color="white" />
					</button>
				</div>
				{isCreatingPost && <Navigate to={"/MapView"} />}
			</main>
		</>
	);
}
