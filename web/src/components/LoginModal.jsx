import { Button, Checkbox, Input, Loading, Modal, Row, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

import config from "../config";

function LoginModal({visible, setVisible, setUser}) {
	const handler = () => setVisible(true);

	const closeHandler = () => {
		setVisible(false);
	};

    const [checked, setChecked] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }, [error]);

    const login = async () => {
        setLoggingIn(true);
        const res = await fetch(config.api.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await res.json();
        if (data.error) {
            setError(data.error);
            setLoggingIn(false);
        } else {
            setUser(data, checked);
            setLoggingIn(false);
            closeHandler();
        }
    };


	return (
		<div>
			<Button auto light onPress={handler} color="inherit">
				Login
			</Button>
			<Modal
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Welcome to&nbsp;
						<Text b size={18}>
							LinkLair
						</Text>
					</Text>
				</Modal.Header>
				<Modal.Body>
					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Email or username"
                        aria-label="username"
                        onChange={(e) => setUsername(e.target.value)}
						// contentLeft={<Mail fill="currentColor" />}
					/>
					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Password"
                        type="password"
                        aria-label="password"
                        onChange={(e) => setPassword(e.target.value)}
						// contentLeft={<Password fill="currentColor" />}
					/>
                    {error && <Text color="error">{error}</Text>}
					<Row justify="space-between">
						<Checkbox isSelected={checked} onChange={setChecked}>
							<Text size={14}>Remember me</Text>
						</Checkbox>
						<Text size={14}>Forgot password?</Text>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						Close
					</Button>
					<Button auto onPress={login}>
                        {loggingIn ? <Loading color="currentColor" size="sm" /> : "Log in"}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default LoginModal;
