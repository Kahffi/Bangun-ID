import { useState } from "react";
import "../assets/styles/Auth.css";
import usePost from "../usePost";

export default function Signup({ ButtonGroup }) {
	const { error, isPending, response: data, fetchData } = usePost();
	// async function handleSubmit(e) {
	// 	try {
	// 		e.preventDefault();

	// 		const formData = new FormData(e.target);

	// 		const signupData = {
	// 			username: formData.get("username"),
	// 			email: formData.get("email"),
	// 			password: formData.get("password"),
	// 		};

	// 		console.log(signupData);
	// 		const response = await fetch(
	// 			"https://infrainsight.vercel.app/user/signup",
	// 			{
	// 				method: "POST",
	// 				headers: { "Content-Type": "application/json" },
	// 				body: JSON.stringify(signupData),
	// 			}
	// 		);
	// 		console.log(response);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// }

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
					type="password"
					id="signup-username"
					placeholder="Masukkan kata sandi"
					name="username"
				/>
			</div>

			{isPending && <h1>Loading</h1>}
			{data && <h1>Request success</h1>}
			<ButtonGroup />
		</form>
	);
}
