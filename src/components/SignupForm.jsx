import "../assets/styles/Auth.css";

export default function Signup({ ButtonGroup }) {
	async function handleSubmit(e) {
		try {
			e.preventDefault();

			const formData = new FormData(e.target);

			const signupData = {
				username: formData.get("username"),
				email: formData.get("email"),
				password: formData.get("password"),
			};

			console.log(signupData);
			const response = await fetch(
				"https://infrainsight.vercel.app/user/signup",
				{
					method: "POST",
					mode: "cors",
					// headers: { "Content-Type": "application/json" },
					body: JSON.stringify(signupData),
				}
			);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
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
			<ButtonGroup />
		</form>
	);
}
