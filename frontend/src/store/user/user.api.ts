import { IUser } from "./../../types/user";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
	reducerPath: "user/api",
	baseQuery: fetchBaseQuery({
		baseUrl: "",
	}),
	endpoints: (build) => ({
		getUser: build.query<IUser[], Number>({
			query: (id: Number) => ({
				url: `users/${id}`,
				method: "get",
				mode: "no-cors",
			}),
		}),
	}),
});

// export const userApi = createApi({
// 	reducerPath: "user/api",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: "https://api.github.com/",
// 	}),
// 	endpoints: (build) => ({
// 		getUser: build.query<any, String>({
// 			query: (search: String) => ({
// 				url: `search/users`,
// 				params: {
// 					q: search, // q - параметр github api
// 					per_page: 10, // per_page - лимит получаемых элементов (параметр github api)
// 				},
// 			}),
// 		}),
// 	}),
// });

export const { useGetUserQuery } = userApi;
