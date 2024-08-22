import { useState } from "react";
import Login from "../components/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../assets/styles/Auth.css";
import Signup from "../components/SignupForm";

export default function AuthPage() {
	const [section, setSection] = useState("login");

	function ButtonGroup() {
		return (
			<div className="btn-group">
				<button className="auth-btn btn-pr" type="submit">
					{section === "login" ? "Masuk" : "Daftar"}
				</button>
				{/* <div className="separator">
					<hr />
					<p>Opsi lain</p>
				</div>
				<button className="auth-btn btn-sc" type="button">
					<FontAwesomeIcon icon={faGoogle} style={{ color: "#ffffff" }} />
					Masuk dengan Google
				</button> */}
			</div>
		);
	}
	function toSignUp() {
		setSection("signup");
	}
	function toLogin() {
		setSection("login");
	}

	return (
		<div id="auth-page">
			<div
				className="auth-left"
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
					justifyContent: "flex-end",
					color: "white",
					padding: "1rem",
					position: "relative",
				}}
			>
				<div
					style={{
						color: "var(--cl-green-pr)",
						width: "fit-content",
						position: "absolute",
						top: 0,
						left: 0,
						padding: "1rem",
					}}
				>
					<h2
						style={{
							backgroundColor: "white",
						}}
					>
						Bangun.ID
					</h2>
				</div>
				<h1>
					“Setiap kita bisa mengambil pelajaran, pembangunan membutuhkan
					kedamaian dan keadilan”
				</h1>
				<h5>- Najwa Shihab -</h5>
			</div>
			<div className="auth-right">
				<h1>Selamat Datang!</h1>
				{section === "login" ? (
					<Login ButtonGroup={ButtonGroup} />
				) : (
					<Signup ButtonGroup={ButtonGroup} />
				)}
				<section>
					<strong>
						{section === "login" ? "Belum punya akun? " : "Sudah punya akun? "}

						{section === "login" ? (
							<strong className="cursor-pointer" onClick={toSignUp}>
								Daftar
							</strong>
						) : (
							<strong className="cursor-pointer" onClick={toLogin}>
								Masuk
							</strong>
						)}
					</strong>
				</section>
			</div>
		</div>
	);
}
