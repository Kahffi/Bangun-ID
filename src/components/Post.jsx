import { useEffect, useState } from "react";
import avatar from "../assets/images/Avatar01.svg";
import contentImage from "../assets/images/Background-1.svg";
import PostControl from "./PostControl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse?";

export default function Post({ post }) {
	const [adressStr, setAddressStr] = useState(null);

	useEffect(() => {
		const params = {
			lat: post.location[0],
			lon: post.location[1],
			format: "json",
		};
		const queryStr = new URLSearchParams(params);
		async function fetchAdress() {
			try {
				const res = await fetch(`${NOMINATIM_REVERSE_URL}${queryStr}`);
				if (!res.ok) throw new Error(res.status);
				const data = await res.json();

				setAddressStr(data.display_name);
			} catch (err) {
				console.error(err);
				alert("Terjadi error");
			}
		}
		fetchAdress();
	}, [post]);

	return (
		<div className="post-wrapper">
			<div className="top-bar">
				<img className="avatar-img" src={avatar} alt="User's profile" />
				<p>{post.user}</p>
			</div>
			<section className="post-content fullsize">
				<section className="image-container">
					<img className="post-image" src={contentImage} alt="post image" />
				</section>
				<section className="content">
					<article className="user">
						<div>
							<h2 className="title">{post.title}</h2>

							<p className="description">{post.description}</p>
						</div>

						<div
							style={{ display: "flex", flexDirection: "column", gap: "10px" }}
						>
							<div>
								<p className="text-small secondary">Tautan Alamat</p>
								<nav className="post-address">
									<div className="left">
										{adressStr ? (
											<p>{adressStr}</p>
										) : (
											<p>Tidak dapat menemukan lokasi</p>
										)}
									</div>
									<div className="right">
										<button className="btn-pr small">Lihat di peta</button>
									</div>
								</nav>
							</div>

							<p className="text-small secondary">tanggal</p>
						</div>
					</article>
					<PostControl />
				</section>
			</section>
		</div>
	);
}
