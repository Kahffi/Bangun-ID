import { faComment, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons/faHeart";
import {
	faHeart as faHeartSolid,
	faShareAlt,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PostControl() {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(51);
	const [isShared, setIsShared] = useState(false);
	const [shareCount, setShareCount] = useState(40);
	const [isOwned, setIsOwned] = useState(false);
	// const [commentCount, setcommentCount] = useState(40);

	function handleLike() {
		isLiked
			? setLikeCount((prevCount) => (prevCount -= 1))
			: setLikeCount((prevCount) => (prevCount += 1));
		setIsLiked(!isLiked);
	}

	function handleShare() {
		// share count hanya bertambah jika belum pernah share
		!isShared && setShareCount((prevCount) => (prevCount += 1));
		!isShared && setIsShared(true);
	}

	function handleDelete() {
		if (!isOwned) return;

		alert("post deleted");
	}
	return (
		<div className="post-control-wrapper">
			<div className="interaction-wrapper">
				<button onClick={handleLike}>
					{isLiked ? (
						<FontAwesomeIcon icon={faHeartSolid} style={{ color: "red" }} />
					) : (
						<FontAwesomeIcon icon={faHeartRegular} style={{ color: "black" }} />
					)}
				</button>
				<p className="interaction-count">{likeCount}</p>
			</div>
			<div className="interaction-wrapper">
				<button onClick={handleShare}>
					<FontAwesomeIcon icon={faShareAlt} style={{ color: "black" }} />
				</button>
				<p className="interaction-count">{shareCount}</p>
			</div>
			<div className="interaction-wrapper">
				<button onClick={handleDelete}>
					{isOwned && (
						<FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
					)}
				</button>
			</div>
		</div>
	);
}
