import { bundlesApi } from "./bundles/bundles.api";
import { testApi } from "./test/test.api";
import { userApi } from "./user/user.api";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import settingsSlice from "./settings/settings.slice";
import bundlesSlice from "./bundles/bundles.slice";

export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		user: userSlice,
		[bundlesApi.reducerPath]: bundlesApi.reducer,
		bundles: bundlesSlice,
		settings: settingsSlice,
	},

	// Добавление middleware API включает кэширование, аннулирование, опрос,
	// и другие полезные функции RTKQuery.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware, bundlesApi.middleware),
});

// Кастомный тип, чтобы понимать с какими данными мы работаем в сторе
export type RootState = ReturnType<typeof store.getState>;
