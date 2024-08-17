import { useState } from "react";
import Login from "../components/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../assets/styles/Auth.css";
import Signup from "../components/Signup";

export default function AuthPage() {
	const [section, setSection] = useState("login");

	function ButtonGroup() {
		return (
			<div className="btn-group">
				<button className="auth-btn btn-pr" type="submit">
					{section === "login" ? "Masuk" : "Daftar"}
				</button>
				<div className="separator">
					<hr />
					<p>Opsi lain</p>
				</div>
				<button className="auth-btn btn-sc" type="button">
					<FontAwesomeIcon icon={faGoogle} style={{ color: "#ffffff" }} />
					Masuk dengan Google
				</button>
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
			<div className="auth-left"></div>
			<div className="auth-right">
				<h2>Selamat Datang!</h2>
				{section === "login" ? (
					<Login ButtonGroup={ButtonGroup} />
				) : (
					<Signup ButtonGroup={ButtonGroup} />
				)}
				<section>
					{section === "login" ? "Belum punya akun? " : "Sudah punya akun? "}

					{section === "login" ? (
						<span onClick={toSignUp}>Daftar</span>
					) : (
						<span onClick={toLogin}>Masuk</span>
					)}
				</section>
			</div>
		</div>
	);
}
