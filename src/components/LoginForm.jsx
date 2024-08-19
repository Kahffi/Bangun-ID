import { useState } from "react";

export default function Login({ ButtonGroup }) {
	async function handleSubmit(e) {
		// const [isLoading, setIsLoading] = useState(true);
		// const [response, setResponse] = useState(null);

		fetch("https://infrainsight.vercel.app/user/login", {
			mode: "POST",
			body: {},
		});
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
			<ButtonGroup />
		</form>
	);
}
