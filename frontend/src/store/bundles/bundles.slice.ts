import { IBundles } from "./../../types/bundles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
		// Занесение данных о связках в стейта
		setBundles: (state, action: PayloadAction<IBundles[] | undefined>) => {
			const value = action.payload;
			if (value !== undefined) state.bundles = value;
		},
	},
});

// export const {} = bundlesSlice.actions;
export const bundlesAction = bundlesSlice.actions;

export default bundlesSlice.reducer;
