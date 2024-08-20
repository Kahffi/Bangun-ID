import { useState } from "react";
import "../assets/styles/Auth.css";
import usePost from "../usePost";

export default function Signup({ ButtonGroup }) {
	const { error, isPending, response: data, fetchData } = usePost();

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		const signupData = {
			username: formData.get("username"),
			email: formData.get("email"),
			password: formData.get("password"),
		};
		fetchData("https://infrainsight.vercel.app/user/signup", signupData);
	}
	console.log(data);
	return (
		<form className="auth-form" id="signup-form" onSubmit={handleSubmit}>
			<p>Daftar menggunakan alamat email</p>
			<div className="text-wrapper">
				<label htmlFor="signup-email">Email</label>
				<input
					required
					type="text"
					name="email"
					id="signup-email"
					placeholder="Masukkan alamat email"
				/>
			</div>
			<div className="text-wrapper">
				<label htmlFor="signup-password">Kata sandi</label>
				<input
					required
					type="password"
					id="signup-password"
					placeholder="Masukkan kata sandi"
					name="password"
				/>
			</div>
			<div className="text-wrapper">
				<label htmlFor="signup-username">Nama pengguna</label>
				<input
					required
					type="text"
					id="signup-username"
					placeholder="Masukkan nama pengguna"
					name="username"
				/>
			</div>

			{isPending && <h1>Loading</h1>}
			{data && <h1>Request success</h1>}
			{error && <h1>Error Occured</h1>}

			<ButtonGroup />
		</form>
	);
}
