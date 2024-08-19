import avatar from "../assets/images/Avatar01.svg";
import contentImage from "../assets/images/Background-1.svg";

export default function Post({ post }) {
	return (
		<div className="post-wrapper">
			<div className="top-bar">
				<img className="avatar-img" src={avatar} alt="User's profile" />
				<p>{post.user}</p>
			</div>
			<main className="post-content fullsize">
				<section className="image-container">
					<img className="post-image" src={contentImage} alt="post image" />
				</section>
				<section className="content">
					<article>
						<h2>{post.title}</h2>
						<p>{post.description}</p>
					</article>
				</section>
			</main>
		</div>
	);
}
