import { BrowserRouter, Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Root from "./pages/Root";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Root />} />
				<Route path="/:username" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
