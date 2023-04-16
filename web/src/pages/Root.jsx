import Dashboard from "./Dashboard";
import Home from "./Home";
import Navbar from "../components/Navbar";
import useUser from "../hooks/useUser";

function Root() {
	const { user, setUser, remUser } = useUser();

	return (
		<div>
			<Navbar user={user} setUser={setUser} remUser={remUser} />
			{user ? (
				<Dashboard user={{user, setUser, remUser}}/>
			) : (
				<Home/>
			)}
		</div>
	);
}

export default Root;
