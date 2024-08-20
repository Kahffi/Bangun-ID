import avatar from "../assets/images/Avatar01.svg";
import contentImage from "../assets/images/Background-1.svg";
import PostControl from "./PostControl";

export default function Post({ post }) {
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
					<article>
						<h2 className="title">{post.title}</h2>
						<p className="description">{post.description}</p>

						<div className="">
							<p className="text-small secondary">Tautan Halaman</p>
							<nav className="post-address">
								<p>aaaaaaaaaaaaaaaaaaaaa</p>
								<button className="btn-pr small">Lihat di peta</button>
							</nav>
						</div>
					</article>
					<PostControl />
				</section>
			</section>
		</div>
	);
}
