import { useEffect, useRef, useState } from "react";
import usePost from "../usePost";

export default function PostForm({ addressName, coordinate }) {
	// const [alamat, setAlamat] = useState("");
	const [judul, setJudul] = useState("");
	const [deskripsi, setDeskripsi] = useState("");
	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);

	console.log(addressName, "address name");

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);

		if (selectedFile) {
			const fileReader = new FileReader();
			fileReader.onload = () => setPreviewUrl(fileReader.result);
			fileReader.readAsDataURL(selectedFile);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("alamat", addressName);
		formData.append("title", judul);
		formData.append("description", deskripsi);
		formData.append("image", file);
		formData.append("userId", "66c4d6f121fb46d5f461c879");
		formData.append("koordinat", coordinate);

		try {
			const response = await fetch(
				"https://infrainsight.vercel.app/post/posting",
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.ok) {
				alert("Data berhasil dikirim!");
			} else {
				alert("Gagal mengirim data.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Terjadi kesalahan saat mengirim data.");
		}
	};

	return (
		<div
			style={{
				maxWidth: "800px",
				maxHeight: "500px",
				margin: "auto",
				padding: "30px",
				backgroundColor: "#f4f4f4",
				borderRadius: "10px",
				overflow: "auto",
			}}
		>
			<form onSubmit={handleSubmit}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "20px",
					}}
				>
					<input
						type="text"
						placeholder="Alamat"
						value={addressName}
						readOnly={true}
						// onChange={(e) => setAlamat(e.target.value)}
						style={{
							flex: 1,
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
							marginRight: "10px",
						}}
					/>
					<button
						type="button"
						style={{
							padding: "10px 20px",
							backgroundColor: "#007bff",
							color: "#fff",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Ubah Alamat
					</button>
				</div>

				<div style={{ marginBottom: "20px" }}>
					<h2>Upload Bukti</h2>
					<label
						style={{
							display: "block",
							border: "2px dashed #ccc",
							padding: "50px",
							textAlign: "center",
							cursor: "pointer",
							borderRadius: "10px",
							position: "relative",
							marginBottom: "10px",
						}}
					>
						<input
							type="file"
							onChange={handleFileChange}
							style={{ display: "none" }}
						/>
						{previewUrl ? (
							<img
								src={previewUrl}
								alt="Preview"
								style={{
									maxWidth: "100%",
									maxHeight: "300px",
									objectFit: "contain",
									borderRadius: "10px",
								}}
							/>
						) : (
							<span style={{ fontSize: "40px", color: "#ccc" }}>+</span>
						)}
					</label>
				</div>

				<div style={{ marginBottom: "20px" }}>
					<h2>Isi Post</h2>
					<input
						type="text"
						placeholder="Isi Judul"
						value={judul}
						onChange={(e) => setJudul(e.target.value)}
						style={{
							width: "100%",
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
							marginBottom: "10px",
						}}
					/>
					<textarea
						placeholder="Isi Deskripsi"
						value={deskripsi}
						onChange={(e) => setDeskripsi(e.target.value)}
						rows="5"
						style={{
							width: "100%",
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
				</div>

				<button
					type="submit"
					style={{
						padding: "10px 20px",
						backgroundColor: "#007bff",
						color: "#fff",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					Kirim
				</button>
			</form>
		</div>
	);
}
