import { Container, Grid, Image, Spacer, Text } from "@nextui-org/react";

import mocks from "../assets/mocks.png";

function Home() {
    return ( 
        <Container>
					<Grid.Container gap={2} justify="center">
						<Grid xs={12} md={6}>
							<Image src={mocks} alt="LinkLair" width="100%" />
						</Grid>
						<Grid
							xs={12}
							md={6}
							direction="column"
							justify="center"
							alignItems="center"
							style={{
								textAlign: "center",
							}}
						>
							<Text
								h1
								size={60}
								css={{
                                    fontFamily: "Roboto",
                                    textTransform: "uppercase",
								}}
								weight="bold"
							>
								LinkLair
							</Text>
							<Text p size={30}>
								LinkLair is a social media platform that allows
								you to share your links with the world.
							</Text>
							<Spacer y={1} />
							<Text p size={20}>
								You can share your links with the world, or keep
								them private.
							</Text>
						</Grid>
					</Grid.Container>
				</Container>
     );
}

export default Home;