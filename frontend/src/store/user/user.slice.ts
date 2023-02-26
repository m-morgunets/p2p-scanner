import { IUser } from "./../../types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useGetUserQuery } from "./user.api";

// Типы данных стейта
interface userState {
	id: number;
	subscription: "standart" | "pro" | "business" | null;
	lastPayDate: string;
	nextPayDate: string;
	registrationDate: string;
	name: string;
	email: string;
	access: boolean;
}

const initialState: userState = {
	id: 0,
	subscription: null,
	lastPayDate: "",
	nextPayDate: "",
	registrationDate: "",
	name: "name",
	email: "name@gmail.com",
	access: false,
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
		setUser(state, action: PayloadAction<IUser[]>) {
			let obj = action.payload[0];
			dateToString(obj.lastPayDate);
			return {
				...state,
				id: obj.id,
				subscription: obj.subscription, // Если из БД придёт значение null, то оно заменится на пустую строку
				lastPayDate: dateToString(obj.lastPayDate),
				nextPayDate: dateToString(obj.nextPayDate),
				registrationDate: dateToString(obj.dateRegistration),
				name: obj.name,
				email: obj.email,
				access: obj.access,
			};
		},
	},
});

// export const { setUser } = userSlice.actions;
export const userActions = userSlice.actions;

export default userSlice.reducer;
