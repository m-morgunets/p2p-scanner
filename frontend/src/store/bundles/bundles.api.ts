import { bundlesActions } from "./bundles.slice";
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
		baseUrl: "http://localhost:5000/api/",
		method: "get",
	}),
	endpoints: (build) => ({
		// Получение стандартных связок
		getStandardBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: 'standardbundles',
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
				dispatch(bundlesActions.setBundles(data));
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
				dispatch(bundlesActions.setBundles(data));
			},
		}),

		// Получение межбиржевых связок
		getInterexchangeBundles: build.mutation<IBundles[], bundlesParams>({
			query: (params: bundlesParams) => ({
				url: "interexchangebundles",
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
				dispatch(bundlesActions.setBundles(data));
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
