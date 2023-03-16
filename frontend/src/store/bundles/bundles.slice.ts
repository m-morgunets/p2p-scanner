import { IBundles } from "./../../types/bundles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс стейта
interface IInitialState {
	bundles: IBundles[];
}

const initialState: IInitialState = {
	bundles: [],
};

const bundlesSlice = createSlice({
	name: "bundles",
	initialState,
	reducers: {
		// Занесение данных о связках в стейт
		setBundles: (state, action: PayloadAction<IBundles[] | undefined>) => {
			const data = action.payload;
			// Проверка, что пришедшие данных не undefined
			if (data !== undefined) state.bundles = data;
		},
	},
});

export const { setBundles } = bundlesSlice.actions;
export const bundlesActions = bundlesSlice.actions;

export default bundlesSlice.reducer;
