import { useState } from "react";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";

function App() {
	return (
		<div id="App">
			<MapPage />
		</div>
	);
}

export default App;
