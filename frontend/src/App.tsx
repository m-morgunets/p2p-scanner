import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import NoActivatedEmail from "./components/NoActivatedEmail/NoActivatedEmail";
import { useActions } from "./hooks/useActions";
import { useAppSelector } from "./hooks/useAppSelector";
import Community from "./pages/Community/Community";
import Exchangedata from "./pages/Exchangedata/Exchangedata";
import Profile from "./pages/Profile/Profile";
import Scanner from "./pages/Scanner/Scanner";
import Support from "./pages/Support/Support";
import Login from "./pages/Аuthorization/Login/Login";
import Signup from "./pages/Аuthorization/Signup/Signup";
import { useRefreshMutation } from "./store/user/user.api";

function App() {

	const { setIsLoading } = useActions();
	const {
		isAuth,
		isLoading,
		userData: { isActivatedEmail, access },
	} = useAppSelector((store) => store.user);

	// Функция для создания новых токенов и поулчение актуальных данных
	const [refreshToken] = useRefreshMutation();

	const checkAuth = async () => {
		setIsLoading(true);
		await refreshToken();
		setIsLoading(false);
	};
	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<>
			{isAuth && isActivatedEmail ? <Header /> : ""}
			
			<Routes>
				{isAuth && !isActivatedEmail && !isLoading && (
					<>
						<Route path="/no-activated-email" element={<NoActivatedEmail />} />
						<Route path="*" element={<Navigate to={"no-activated-email"} />} />
					</>
				)}

				{!isLoading && (
					<Route
						path="*"
						element={<Navigate to={isAuth ? "/profile" : "/login"} />}
					/>
				)}

				{isAuth && isActivatedEmail && !isLoading && (
					<>
						<Route path="/profile" element={<Profile />} />
						<Route path="/support" element={<Support />} />
						<Route path="/community" element={<Community />} />
						{access && (
							<>
								<Route path="/scanner" element={<Scanner />} />
								<Route path="/exchangedata" element={<Exchangedata />} />
							</>
						)}
					</>
				)}

				{!isAuth && (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</>
				)}
			</Routes>
		</>
	);
}

export default App;
