import { Button } from "@nextui-org/react";

function Link({ name, link, icon }) {
	return (
		<Button
			icon={icon}
			onClick={() => window.open(link, "_blank")}
			style={{
				backgroundColor: "#333333",
				backgroundOpacity: "0.5",
				width: "50%",
				margin: "0.5rem",
			}}
		>
			{name}
		</Button>
	);
}

export default Link;
