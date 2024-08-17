import { useState } from "react";
import "./assets/styles/App.css";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";

function App() {
	return (
		<div id="App">
			<Navbar />
			<AuthPage />
		</div>
	);
}

export default App;
