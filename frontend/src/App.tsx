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

	// TESTS
	// const [getUsers] = useGetUsersMutation();
	// const [refreshToken] = useRefreshMutation(); 
	// useEffect(() => {
		// const fatchData = async () => {
		// 	await refreshToken();
		// 	await getUsers();
		// }
		// fatchData()
	// }, []);


	// Функция для создания новых токенов и поулчение актуальных данных
	const [refreshToken] = useRefreshMutation(); 
	useEffect(() => {
		refreshToken();
	}, []);

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
