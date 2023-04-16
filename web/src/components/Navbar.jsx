import { Button, Text } from "@nextui-org/react";

import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { Navbar as Nav } from "@nextui-org/react";
import { useState } from "react";
import useUser from "../hooks/useUser";

function Navbar({ user, setUser, remUser }) {
	const [loginModal, setLoginModal] = useState(false);

	console.log(user);

	return (
		<Nav isBordered variant="static">
			<Nav.Brand>
				<Text
					b
					color="inherit"
					style={{
						fontSize: "1.5rem",
					}}
				>
					LinkLair
				</Text>
			</Nav.Brand>
			{user ? (
				<Nav.Content>
					<Nav.Link color="inherit" to={`/${user.username}`} as={Link}>
						Profile
					</Nav.Link>
					<Nav.Item>
						<Button auto flat as={Link} onClick={() => remUser()}>
							Logout
						</Button>
					</Nav.Item>
				</Nav.Content>
			) : (
				<Nav.Content>
					<Nav.Link>
						<LoginModal
							visible={loginModal}
							setVisible={setLoginModal}
							setUser={setUser}
						/>
					</Nav.Link>
					<Nav.Item>
						<Button auto flat as={Link} href="#">
							Sign Up
						</Button>
					</Nav.Item>
				</Nav.Content>
			)}
		</Nav>
	);
}

export default Navbar;
