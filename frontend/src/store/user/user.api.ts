import { Mutex } from "async-mutex";
import { setUser, tokenReceived } from "./user.slice";
import { IRespUser, IUser } from "./../../types/user";

import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";

interface registrationParams {
	name: string;
	email: string;
	password: string;
}

interface authorizationParams {
	email: string;
	password: string;
}

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000/api/",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).user.accessToken;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery("/refresh", api, extraOptions);
				if (refreshResult.data) {
					api.dispatch(tokenReceived(refreshResult.data));
					// retry the initial query
					result = await baseQuery(args, api, extraOptions);
				} else {
					// api.dispatch(loggedOut())
				}
			} finally {
				// release must be called once the mutex should be released again.
				release();
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const userApi = createApi({
	reducerPath: "user/api",

	// baseQuery: fetchBaseQuery({
	// 	baseUrl: "http://localhost:5000/api/",
	// 	headers: {
	// 		Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 	},
	// }),

	baseQuery: baseQueryWithReauth,

	endpoints: (build) => ({
		signup: build.mutation<IRespUser, registrationParams>({
			query: (body: registrationParams) => ({
				url: "registration",
				method: "post",
				body,
			}),
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;
				dispatch(setUser(data));
			},
		}),

		login: build.mutation<IRespUser, authorizationParams>({
			query: (body: authorizationParams) => ({
				url: "login",
				method: "post",
				body,
			}),
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;
				dispatch(setUser(data));
			},
		}),

		getUsers: build.mutation<any, string>({
			query: (token) => ({
				url: "users",
				method: "get",
			}),
		}),

		refresh: build.mutation<IRespUser, void>({
			query: () => ({
				url: "refresh",
				method: "get",
			}),
			async onQueryStarted(params, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;
				dispatch(setUser(data));
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useGetUsersMutation,
	useRefreshMutation,
} = userApi;
