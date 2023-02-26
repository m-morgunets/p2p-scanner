import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { useAppSelector } from "./hooks/useAppSelector";
import Community from "./pages/Community/Community";
import Exchangedata from "./pages/Exchangedata/Exchangedata";
import Profile from "./pages/Profile/Profile";
import Scanner from "./pages/Scanner/Scanner";
import Support from "./pages/Support/Support";

function App() {
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
			</Routes>
		</>
	);
}

export default App;
