import { Container } from "@nextui-org/react";

function CenterLayout({ children }) {
	return (
		<Container
			justify="center"
			alignItems="center"
			direction="column"
			display="flex"
			style={{
				height: "100vh",
			}}
		>
			{children}
		</Container>
	);
}

export default CenterLayout;
