import "./index.css";

import { NextUIProvider, createTheme } from "@nextui-org/react";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const darkTheme = createTheme({
	type: "dark",
	theme: {
		fonts: {},
	},
});

root.render(
	<React.StrictMode>
		<NextUIProvider theme={darkTheme}>
			<App />
		</NextUIProvider>
	</React.StrictMode>
);
