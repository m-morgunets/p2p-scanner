import { bundlesAction } from "./bundles.slice";
import { IBundles } from "./../../types/bundles";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface bundlesParams {
	exchanges: String[];
	sum: String;
	payTypes: String[];
	assets: String[];
}

export const bundlesApi = createApi({
	reducerPath: "exchange/api",
	baseQuery: fetchBaseQuery({
		baseUrl: "",
		method: "get",
		mode: "no-cors", // Параметр чтобы делать запросы на локальный сервер
	}),
	endpoints: (build) => ({
		// Получение стандартных связок
		getStandardBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: `bundles/${params.exchanges}`,
				params: {
					sum: params.sum,
					payTypes: params.payTypes,
					assets: params.assets,
				},
			}),
			async onQueryStarted(
				params: bundlesParams,
				{ dispatch, queryFulfilled }
			) {
				const { data } = await queryFulfilled;
				dispatch(bundlesAction.setBundles(data));
			},
		}),

		// Поулчение конвертационных связок
		getConversionBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: `conversionbundles`,
				params: {
					exchanges: params.exchanges,
					sum: params.sum,
					payTypes: params.payTypes,
					assets: params.assets,
				},
			}),
			async onQueryStarted(
				params: bundlesParams,
				{ dispatch, queryFulfilled }
			) {
				const { data } = await queryFulfilled;
				dispatch(bundlesAction.setBundles(data));
			},
		}),

		// Получение межбиржевых связок
		getInterexchangeBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: "interexchange",
				params: {
					exchanges: params.exchanges,
					sum: params.sum,
					payTypes: params.payTypes,
					assets: params.assets,
				},
			}),
			async onQueryStarted(
				params: bundlesParams,
				{ dispatch, queryFulfilled }
			) {
				const { data } = await queryFulfilled;
				dispatch(bundlesAction.setBundles(data));
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
	// useGetBundlesQuery,
	// useLazyGetBundlesQuery,
	useGetStandardBundlesMutation,
	useGetConversionBundlesMutation,
	useGetInterexchangeBundlesMutation,
	useGetExchangedataQuery,
} = bundlesApi;
