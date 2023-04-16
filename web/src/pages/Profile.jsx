import { Container, Grid, Image, Loading, Spacer, Text } from "@nextui-org/react";

import Bio from "../components/Bio";
import CenterLayout from "../components/CenterLayout";
import Link from "../components/Link";
import Social from "../components/Social";
import config from "../config";
import fetcher from "../fetcher";
import { useParams } from "react-router-dom";
import useSWR from "swr";

function Profile() {
	const { username } = useParams();
	const { data, error } = useSWR(
		`${config.api.profile}/${username}`,
		fetcher
	);

	if (error)
		return (
			<CenterLayout>
				<Text h2 size={60}>
					Oops
				</Text>
				<Text size={30}>{error.message}</Text>
			</CenterLayout>
		);
	if (!data)
		return (
			<CenterLayout>
				<Loading size="xl" color="success"></Loading>
			</CenterLayout>
		);

	const { socials, links, name, bio, avatar } = data;

	return (
		<Container
			display="flex"
			justify="center"
			direction="column"
			alignItems="center"
			xs
			style={{
				marginTop: "4rem",
			}}
		>
			{avatar && (
				<Image
					src={avatar}
					alt={name}
					width="8em"
					style={{ borderRadius: "50%"}}
				/>
			)}
			<Text h2>{name}</Text>
			<Bio text={bio} />
			<Spacer y={1} />
			<Grid.Container justify="center" gap={1}>
				{socials.map((item) => (
					<Grid key={item.type}>
						<Social type={item.type} link={item.link} />
					</Grid>
				))}
			</Grid.Container>
			<Spacer y={1} />
			{links.map((item) => (
				<Link
					key={item.name}
					name={item.name}
					link={item.link}
					icon={item.icon}
				/>
			))}
		</Container>
	);
}

export default Profile;
