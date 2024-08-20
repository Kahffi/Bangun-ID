import { useState } from "react";
import usePost from "../usePost";

export default function Login({ ButtonGroup }) {
	const { error, fetchData, isPending, response } = usePost();

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		const loginData = {
			email: formData.get("email"),
			password: formData.get("password"),
		};
		fetchData("https://infrainsight.vercel.app/user/login", loginData);
	}

	return (
		<form className="auth-form" id="login-form" onSubmit={handleSubmit}>
			<p>Masuk menggunakan alamat email</p>

			<div className="text-wrapper">
				<label htmlFor="login-email">Email</label>
				<input
					required
					type="text"
					id="login-email"
					name="email"
					placeholder="Masukkan alamat email"
				/>
			</div>
			<div className="text-wrapper">
				<label htmlFor="login-password">Kata sandi</label>
				<input
					required
					type="password"
					name="password"
					id="login-password"
					placeholder="Masukkan kata sandi"
				/>
			</div>
			{isPending && <h1>Loading...</h1>}
			{response && <h1>Response ok</h1>}
			{error && <h1>error occured</h1>}
			<ButtonGroup />
		</form>
	);
}
