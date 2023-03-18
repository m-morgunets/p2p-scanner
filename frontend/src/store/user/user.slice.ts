import { IRespUser, IUser } from "./../../types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс данных пользователя
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

// Интерфейс данных использующихся при авторизации/регистрации
interface Authorization {
	name: string;
	email: string;
	password: string;
}

// Типы данных стейта
interface IInitialState {
	userData: User;
	authorization: Authorization;
	isAuth: boolean;
	isLoading: boolean;
	errorAuth: string;
}

const initialState: IInitialState = {
	userData: {
		id: 0,
		subscription: null,
		lastPayDate: "-",
		nextPayDate: "-",
		registrationDate: "-",
		name: "-",
		email: "-",
		access: false,
	},
	authorization: {
		name: "",
		email: "",
		password: "",
	},
	isAuth: false,
	isLoading: true,
	errorAuth: "",
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
		setUserData: (state, action: PayloadAction<IRespUser>) => {
			const { accessToken, user } = action.payload;

			// Добавление access токена в localStorage
			localStorage.setItem("token", accessToken);
			state.isAuth = true;
			state.isLoading = false;
			// Добавление данных в стейт
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

		clearUserData: (state, action: PayloadAction<void>) => {
			// Удаление access токена из localStorage
			localStorage.removeItem("token");
			state.isAuth = false;
			state.isLoading = false;
			// Очистка данных о пользователе
			state.userData = {
				...initialState.userData,
			};
		},

		setErrorAuth: (state, action: PayloadAction<string>) => {
			state.errorAuth = action.payload;
		},

		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},

		setIsAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
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
	},
});

export const { setUserData, clearUserData, setErrorAuth } =
	userSlice.actions;
export const userActions = userSlice.actions;

export default userSlice.reducer;
