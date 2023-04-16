import {
	Button,
	Grid,
	Image,
	Input,
	Loading,
	Popover,
	Spacer,
	Text,
	Textarea,
} from "@nextui-org/react";

import config from "../config";
import { useState } from "react";

function ProfileForm(props) {
	const [name, setName] = useState(props.name);
	const [bio, setBio] = useState(props.bio);
	const [avatar, setAvatar] = useState(props.avatar);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const onSubmit = async () => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const res = await fetch(`${config.api.profile}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.user.user.token}`,
				},
				body: JSON.stringify({
					name,
					bio,
					avatar,
				}),
			});
			const data = await res.json();
			if (data.error) {
				setError(data.error);
			} else {
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 3000);
			}
		} catch (err) {
			setError(err.message);
		}
		setLoading(false);
	};

	return (
		<Grid.Container gap={2}>
			<Grid xs={12} md={12}>
				<Text h2>Profile</Text>
			</Grid>
			<Grid xs={12} md={6} direction="column">
				<Image
					src={avatar}
					alt="avatar"
					width="12em"
					style={{
						borderRadius: "50%",
					}}
				/>
			</Grid>
			<Grid xs={12} md={6} direction="column">
				<Input
					label="Full Name"
					size="xl"
					value={name}
					placeholder="Guillermo Rauch"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<Spacer y={1} />
				<Input
					label="Avatar"
					size="xl"
					value={avatar}
					placeholder="https://..."
					onChange={(e) => {
						setAvatar(e.target.value);
					}}
				/>
			</Grid>

			<Grid xs={12} md={12}>
				<Textarea
					label="Bio"
					size="xl"
					value={bio}
					placeholder="Enter your amazing ideas."
					width="100%"
					minRows={5}
					onChange={(e) => {
						setBio(e.target.value);
					}}
				/>
			</Grid>
			<Grid xs={12} md={12} justify="end">
				<Text color="error">{error}</Text>
				<Button
					onPress={onSubmit}
					color={success ? "success" : "primary"}
				>
					{loading ? <Loading /> : success ? "Saved" : "Save"}
				</Button>
			</Grid>
		</Grid.Container>
	);
}

export default ProfileForm;
