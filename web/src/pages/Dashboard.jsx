import { Container, Loading, Spacer, Text } from "@nextui-org/react";

import CenterLayout from "../components/CenterLayout";
import ProfileForm from "../components/ProfileForm";
import SocialForm from "../components/SocialForm";
import config from "../config";
import fetcher from "../fetcher";
import useSWR from "swr";

function Dashboard({user}) {
    const {user:_user, setUser, remUser} = user;
    const { data, error } = useSWR(`${config.api.profile}/${_user.username}`, fetcher);

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

    const { name, bio, avatar, socials, links } = data;

	return (
		<Container
			style={{
				marginTop: "2rem",
			}}
		>
			<ProfileForm name={name} bio={bio} avatar={avatar} user={user}></ProfileForm>
            <Spacer y={2} />
            <SocialForm socials={socials} user={user}></SocialForm>
		</Container>
	);
}

export default Dashboard;
