import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

interface bundlesParams {
	exchanges: String[];
	sum: String;
	payTypes: String[];
	assets: String[];
}

export const testApi = createApi({
	reducerPath: "test/api",
	baseQuery: fetchBaseQuery({
		baseUrl: "",
	}),
	endpoints: (build) => ({
		getBundles: build.query<any, bundlesParams>({
			query: (params: bundlesParams) => ({
				url: `bundles/${params.exchanges}`,
				method: "get",
				mode: "no-cors",
				params: {
					sum: params.sum,
					payTypes: params.payTypes,
					assets: params.assets
				}
			}),
		}),
	}),
});

// export const testApi = createApi({
// 	reducerPath: "test/api",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: "",
// 	}),
// 	endpoints: (build) => ({
// 		getBundles: build.query<any, bundlesParams>({
// 			query: (params: bundlesParams) => ({
// 				url: `conversionbundles/`,
// 				method: "get",
// 				mode: "no-cors",
// 				params: {
// 					sum: params.sum,
// 					payTypes: params.payTypes,
// 					assets: params.assets
// 				}
// 			}),
// 		}),
// 	}),
// });

// export const testApi = createApi({
// 	reducerPath: "test/api",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: "",
// 	}),
// 	endpoints: (build) => ({
// 		getBundles: build.query<any, bundlesParams>({
// 			query: (params: bundlesParams) => ({
// 				url: `interexchange`,
// 				method: "get",
// 				mode: "no-cors",
// 				params: {
// 					exchanges: params.exchanges,
// 					sum: params.sum,
// 					payTypes: params.payTypes,
// 					assets: params.assets
// 				}
// 			}),
// 		}),
// 	}),
// });

// export const testApi = createApi({
// 	reducerPath: "test/api",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: "",
// 	}),
// 	endpoints: (build) => ({
// 		getBundles: build.query<any, String>({
// 			query: (dataType: String) => ({
// 				url: `exchangedata/${dataType}`,
// 				method: "get",
// 				mode: "no-cors",
// 			}),
// 		}),
// 	}),
// });

export const { useGetBundlesQuery } = testApi;
