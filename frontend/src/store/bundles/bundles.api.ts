import { setBundles } from "./bundles.slice";
import { IBundles } from "./../../types/bundles";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Интерфейс параметров при запросе связок
interface bundlesParams {
	exchanges: String[];
	sum: String;
	payTypes: String[];
	assets: String[];
}

export const bundlesApi = createApi({
	reducerPath: "exchange/api",
	// Задание базовых данных запроса
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/",
		method: "get",
		credentials: "include", // Присоединение данных авторизации (refreshToken)
		// prepareHeaders генерирует заголовки при каждом запросе
		prepareHeaders: (headers, { getState }) => {
			// Добавление заголовка с access токеном
			headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
			return headers;
		},
	}),
	endpoints: (build) => ({
		// Получение стандартных связок
		getStandardBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: "standardbundles",
				params,
			}),
			async onQueryStarted(params, { dispatch, queryFulfilled }) {
				// Получение данных по окончанию запроса
				const { data } = await queryFulfilled;
				// Добавление связок в стейт
				dispatch(setBundles(data));
			},
		}),

		// Поулчение конвертационных связок
		getConversionBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: `conversionbundles`,
				params,
			}),
			async onQueryStarted(params, { dispatch, queryFulfilled }) {
				// Получение данных по окончанию запроса
				const { data } = await queryFulfilled;
				// Добавление связок в стейт
				dispatch(setBundles(data));
			},
		}),

		// Получение межбиржевых связок
		getInterexchangeBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: "interexchangebundles",
				params,
			}),
			async onQueryStarted(params, { dispatch, queryFulfilled }) {
				// Получение данных по окончанию запроса
				const { data } = await queryFulfilled;
				// Добавление связок в стейт
				dispatch(setBundles(data));
			},
		}),

		// Получение биржевых связок
		getExchangedata: build.query<any, String>({
			query: (dataType: String) => ({
				url: `exchangedata/${dataType}`,
			}),
		}),
	}),
});

export const {
	useGetStandardBundlesMutation,
	useGetConversionBundlesMutation,
	useGetInterexchangeBundlesMutation,
	useGetExchangedataQuery,
} = bundlesApi;
