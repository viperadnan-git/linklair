import { Button } from "@nextui-org/react";
import config from "../config";

function Social({ type, link }) {
	return (
		<Button
			auto
			icon={config.iconMapping[type]}
			onClick={() => window.open(link, "_blank")}
			style={{
				backgroundColor: "#333333",
			}}
		/>
	);
}

export default Social;
