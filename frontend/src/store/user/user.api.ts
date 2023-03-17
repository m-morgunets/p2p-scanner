import { Mutex } from "async-mutex";
import { clearUserData, setUserData } from "./user.slice";
import { IRespUser, IUser } from "./../../types/user";

import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";

// Параметры регистрации
interface registrationParams {
	name: string;
	email: string;
	password: string;
}
// Параметры авторизации
interface authorizationParams {
	email: string;
	password: string;
}

// Создаем новый мьютекс
const mutex = new Mutex();
// Задание базовых данных запроса
const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000/api/",
	credentials: "include", // Присоединение данных авторизации (refreshToken)
	// prepareHeaders генерирует заголовки при каждом запросе
	prepareHeaders: (headers, { getState }) => {
		// Добавление заголовка с access токеном
		headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
		return headers;
	},
});
// Создание функции выполняющейся при каждом запросе
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	// Ожидание, пока мьютекс станет доступным
	await mutex.waitForUnlock();

	// Выполнение изначального запроса
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		// Проверка, заблокирован ли мьютекс
		if (!mutex.isLocked()) {
			// Блокировка мьютекса
			const release = await mutex.acquire();
			try {
				// Запрос на обновление токенов
				const refreshResult = await baseQuery("/refresh", api, extraOptions);
				if (refreshResult.data) {
					// Получение токена из пришедших данных
					const token = (refreshResult.data as IRespUser).accessToken;
					// Занесение токена в localStorage
					localStorage.setItem("token", token);
					// Повторение изначального запроса
					result = await baseQuery(args, api, extraOptions);
				} else {
					// Выполняется запрос "logout" из объекта userApi
					api.dispatch(userApi.endpoints.logout.initiate());
				}
			} finally {
				// Разблокировка мьютекса
				release();
			}
		} else {
			// Ожидание, пока мьютекс станет доступным
			await mutex.waitForUnlock();
			// Повторение изначального запроса
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const userApi = createApi({
	reducerPath: "user/api",

	baseQuery: baseQueryWithReauth, // Функция выполняется при каждом запросе

	endpoints: (build) => ({
		// Запрос регистрации
		signup: build.mutation<IRespUser, registrationParams>({
			query: (body: registrationParams) => ({
				url: "registration",
				method: "post",
				body,
			}),
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				// Получение данных по окончанию запроса
				const { data } = await queryFulfilled;
				// Добавение всех данных в стейт
				dispatch(setUserData(data));
			},
		}),

		// Запрос авторизации
		login: build.mutation<IRespUser, authorizationParams>({
			query: (body: authorizationParams) => ({
				url: "login",
				method: "post",
				body,
			}),
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				// Получение данных по окончанию запроса
				const { data } = await queryFulfilled;
				// Добавение всех данных в стейт
				dispatch(setUserData(data));
			},
		}),

		// Запрос входа
		logout: build.mutation<void, void>({
			query: () => ({
				url: "logout",
				method: "post",
			}),
			async onQueryStarted(params, { dispatch }) {
				// Удаление всех данных о пользователе
				dispatch(clearUserData());
			},
		}),

		// Запрос на обновление токенов
		refresh: build.mutation<IRespUser, void>({
			query: () => ({
				url: "refresh",
				method: "get",
			}),
			async onQueryStarted(params, { dispatch, queryFulfilled }) {
				// Получение данных по окончанию запроса
				const { data } = await queryFulfilled;
				// Добавение всех данных в стейт
				dispatch(setUserData(data));
			},
		}),

		// TESTS
		getUsers: build.mutation<any, void>({
			query: () => ({
				url: "users",
				method: "get",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useGetUsersMutation, // TESTS
	useRefreshMutation,
	useLogoutMutation,
} = userApi;
