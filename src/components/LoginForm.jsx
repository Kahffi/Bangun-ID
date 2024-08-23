import { useContext, useState } from "react";
import usePost from "../usePost";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Login({ ButtonGroup }) {
	const { error, fetchData, isPending, data: user } = usePost();
	const { setUser } = useContext(AppContext);

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		const loginData = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		console.log(loginData);

		fetchData("https://infrainsight.vercel.app/user/login", {
			body: loginData,
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});
	}

	function ErrorMessage() {
		console.log(error, "the error");

		if (error === 400) {
			return <h1>Email atau Password yang anda masukkan salah</h1>;
		} else {
			return <h1>Error Occured</h1>;
		}
	}

	return (
		<form className="auth-form" id="login-form" onSubmit={handleSubmit}>
			<p>Masuk menggunakan alamat email</p>

			<div className="text-wrapper">
				<label htmlFor="login-email">Email</label>
				<input
					autoComplete="on"
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
					autoComplete="on"
					required
					type="password"
					name="password"
					id="login-password"
					placeholder="Masukkan kata sandi"
				/>
			</div>
			{error && <ErrorMessage />}
			{user && setUser(user)}
			{!isPending && user ? <Navigate to={"/Home"} /> : null}
			<ButtonGroup />
		</form>
	);
}
