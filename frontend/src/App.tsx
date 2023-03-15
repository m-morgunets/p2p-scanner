import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { useActions } from "./hooks/useActions";
import { useAppSelector } from "./hooks/useAppSelector";
import Community from "./pages/Community/Community";
import Exchangedata from "./pages/Exchangedata/Exchangedata";
import Profile from "./pages/Profile/Profile";
import Scanner from "./pages/Scanner/Scanner";
import Support from "./pages/Support/Support";
import Confirmation from "./pages/Аuthorization/Confirmation/Confirmation";
import Login from "./pages/Аuthorization/Login/Login";
import Signup from "./pages/Аuthorization/Signup/Signup";
import {
	useGetUsersMutation,
	useRefreshMutation,
} from "./store/user/user.api";

function App() {

	const { accessToken } = useAppSelector((store) => store.user);
	const { setUser } = useActions();

	const [getUsers] = useGetUsersMutation();
	const [refreshToken] = useRefreshMutation(); 

	useEffect(() => {
		const fatchData = async () => {
			await refreshToken();
			// await getUsers(accessToken);
		}
		fatchData()
	}, []);

	// const [signup, { isError, isLoading }] = useSignupMutation();
	// useEffect(() => {
	// 	signup({
	// 		email: "misha1237711@yandex.ru",
	// 		password: "mm0214123771",
	// 	});
	// }, []);

	// const { isLoading, isError, data: user } = useGetUserQuery(2);
	// const { setUser } = useActions();
	// useEffect(() => {
	// 	if (user !== undefined) {
	// 		setUser(user);
	// 	} else{
	// 		console.error("С сервера не пришли данные о пользователе!");
	// 	}
	// }, [user]);

	return (
		<>
			<Header />
			<Routes>
				<Route path="/scanner" element={<Scanner />} />
				<Route path="/community" element={<Community />} />
				<Route path="/support" element={<Support />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/exchangedata" element={<Exchangedata />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				{/* <Route path="/confirmation" element={<Confirmation/>} /> */}
			</Routes>
		</>
	);
}

export default App;
