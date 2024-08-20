import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import "../assets/styles/Home.css";

const post = {
	title: "Jembatan rusak",
	user: "Doe John",
	description:
		"human gentle nature another tail largest pot there length negative naturally eye electric automobile stream eaten flag point everywhere serious vegetable result ride shine smile stiff sink softly throughout fair activity everybody spent belt gas degree peace wear thy mixture offer center either occasionally theory way young flower",
	location: [-6.21462, 6.84513],
};

export default function HomePage() {
	const [posts, setPosts] = useState([{ ...post }]);

	return (
		<>
			<Navbar />
			<main className="home-wrapper">
				{posts.map((post, idx) => {
					console.log("am i running?");
					return <Post key={post.title + idx} post={post} />;
				})}
			</main>
		</>
	);
}
