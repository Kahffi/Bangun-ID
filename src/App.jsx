import { useState } from "react";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<div id="App">
				<Routes>
					<Route element={<HomePage />} path="/Home" />
					<Route element={<MapPage />} path="/MapView" />
					<Route element={<AuthPage />} path="/" />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
