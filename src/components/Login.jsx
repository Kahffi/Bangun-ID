export default function Login({ ButtonGroup }) {
	return (
		<form className="auth-form" id="login-form" onSubmit={() => alert("login")}>
			<div className="text-wrapper">
				<label htmlFor="login-email">Email</label>
				<input
					required
					type="text"
					id="login-email"
					placeholder="Masukkan alamat email"
				/>
			</div>
			<div className="text-wrapper">
				<label htmlFor="login-password">Password</label>
				<input
					required
					type="text"
					id="login-password"
					placeholder="Masukkan password"
				/>
			</div>
			<ButtonGroup />
		</form>
	);
}
