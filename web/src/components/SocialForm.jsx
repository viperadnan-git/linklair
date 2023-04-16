import { Button, Container, Grid, Loading, Text } from "@nextui-org/react";

import config from "../config";
import fetcher from "../fetcher";
import useSWR from "swr";

function SocialForm({ socials, user }) {
	const { user: _user, setUser, remUser } = user;

	const { data, error } = useSWR(`${config.api.social}/available`, fetcher);

	if (error)
		<Text h2 size={10}>
			{error.message}
		</Text>;
	if (!data) return <Loading size="xl" color="success"></Loading>;

    console.log(socials)

	return (
		<Container>
			<Text h2>Socials</Text>
			<Grid.Container gap={1}>
				{data.available.map((item) => (
					<Grid key={item}>
						<Button
							auto
							style={{
                                backgroundColor: Object.keys(socials).includes(item) ? "#333333" : "#000000",
								textTransform: "capitalize",
							}}
                            icon={config.iconMapping[item]}
						>
							{item}
						</Button>
					</Grid>
				))}
			</Grid.Container>
		</Container>
	);
}

export default SocialForm;
