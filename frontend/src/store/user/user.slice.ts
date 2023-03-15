import { IRespUser, IUser } from "./../../types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	id: number;
	subscription: "standart" | "pro" | "business" | null;
	lastPayDate: string;
	nextPayDate: string;
	registrationDate: string;
	name: string;
	email: string;
	access: boolean;
}

interface Authorization {
	name: string;
	email: string;
	password: string;
}

// Типы данных стейта
interface IInitialState {
	userData: User;
	authorization: Authorization;
	accessToken: string;
}

const initialState: IInitialState = {
	userData: {
		id: 0,
		subscription: null,
		lastPayDate: "",
		nextPayDate: "",
		registrationDate: "",
		name: "name",
		email: "name@gmail.com",
		access: false,
	},
	authorization: {
		name: "",
		email: "",
		password: "",
	},
	accessToken: "",
};

// Функция для преобразования дат из базы данных в нужный вид
function dateToString(date: Date | null) {
	if (date === null) return "";
	// Преобразуем в строку, берём первые 10 символов, переобразовываем в массив, разворачиваем массив и преобразуем обратно в строку
	return String(date).slice(0, 10).split("-").reverse().join(".");
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// Задание данных пользователя
		setUser: (state, action: PayloadAction<IRespUser>) => {
			const {accessToken, user} = action.payload;
			
			localStorage.setItem('token', accessToken);
			state.accessToken = accessToken;

			state.userData = {
				...state.userData,
				id: user.id,
				subscription: user.subscription, // Если из БД придёт значение null, то оно заменится на пустую строку
				lastPayDate: dateToString(user.lastPayDate),
				nextPayDate: dateToString(user.nextPayDate),
				registrationDate: dateToString(user.dateRegistration),
				name: user.name,
				email: user.email,
				access: user.access,
			};
		},

		// Задание email-а из окна авторизации/регистрации
		setAuthEmail: (state, action: PayloadAction<string>) => {
			state.authorization.email = action.payload;
		},
		// Задание имени из окна авторизации/регистрации
		setAuthName: (state, action: PayloadAction<string>) => {
			state.authorization.name = action.payload;
		},
		// Задание пароля из окна авторизации/регистрации
		setAuthPassword: (state, action: PayloadAction<string>) => {
			state.authorization.password = action.payload;
		},

		tokenReceived: (state, action: PayloadAction<any>) => {
			state.accessToken = action.payload.accessToken;
			localStorage.setItem("token", action.payload.accessToken);
		},

		// checkAuth: (state, action: PayloadAction<IRespUser>)=> {
		// 	const {accessToken, refreshToken, user} = action.payload;
		// 	console.log(action.payload);

		// 	// const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
		// 	localStorage.setItem('token', accessToken);
		// 	state.accessToken = accessToken;
			
		// }
	},
});

export const { tokenReceived, setUser } = userSlice.actions;
export const userActions = userSlice.actions;

export default userSlice.reducer;
