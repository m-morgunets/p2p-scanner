import { IRespInfoBundles } from "../../types/settings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type typeMode = "standard" | "conversion" | "interexchange";

export interface IModeItem {
	typeExchange: "radio" | "checkbox";
	activeExchange: string[];
	exchanges: string[];
	currentData: Array<{
		exchange: string;
		payTypes: string[];
		assets: string[];
	}>;
	sum: string;
	sumToRequest: string;
}

// Тип отдельного объекта в стейте
interface ISettingsInfoItem {
	payTypes: string[];
	assets: string[];
}

interface IInitialState {
	settingsInfo: Record<string, ISettingsInfoItem>;
	activeSettingsInfo: string;
	activeCurrentData: ISettingsInfoItem;
	activeMode: typeMode;
	modes: Array<{ name: string; value: typeMode }>;
	standard: IModeItem;
	conversion: IModeItem;
	interexchange: IModeItem;
}

const initialState: IInitialState = {
	settingsInfo: {},
	activeSettingsInfo: "binance",
	activeCurrentData: { assets: [], payTypes: [] },
	activeMode: "standard",
	modes: [
		{ name: "Стандартный", value: "standard" },
		{ name: "Конвертационный", value: "conversion" },
		{ name: "Межбиржевой", value: "interexchange" },
	],
	standard: {
		typeExchange: "radio",
		activeExchange: ["binance"],
		exchanges: ["binance", "huobi", "bizlato"],
		currentData: [
			{ exchange: "binance", payTypes: [], assets: [] },
			{ exchange: "huobi", payTypes: [], assets: [] },
			{ exchange: "bizlato", payTypes: [], assets: [] },
		],
		sum: "5000",
		sumToRequest: "5000",
	},
	conversion: {
		typeExchange: "radio",
		activeExchange: ["binance"],
		exchanges: ["binance"],
		currentData: [{ exchange: "binance", payTypes: [], assets: [] }],
		sum: "5000",
		sumToRequest: "5000",
	},
	interexchange: {
		typeExchange: "checkbox",
		activeExchange: [],
		exchanges: ["binance", "huobi", "bizlato"],
		currentData: [{ exchange: "interexchange", payTypes: [], assets: [] }],
		sum: "5000",
		sumToRequest: "5000",
	},
};

// Создание асинхронной операции
export const getSettingsInfo = createAsyncThunk(
	"settings/getSettingsInfo",

	// Получает один параметр
	// dispath получается из параметра thunkAPI
	async (parameters: void, { dispatch }) => {
		await axios({ method: "get", url: `http://localhost:5000/api/settings` })
			.then((response) => {
				// Используется reducer "setSettings"
				dispatch(settingsActions.setSettings(response.data));
			})
			// Перехват ошибок
			.catch((error) => {
				console.log(error);
			});
	}
);

export interface IToggleCheckParams {
	value: string;
	type: "assets" | "payTypes";
}

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		// reducer заносит данные о настройках, полученные с помощью асинхронной операции getInfoBundles
		setSettings: (state, action: PayloadAction<IRespInfoBundles[]>) => {
			// занесение данных в стейт по ключу "action.payload.exchange" из пришедших данных
			action.payload.forEach((item) => {
				state.settingsInfo[item.exchange] = {
					payTypes: item.payTypes.split(", "), // Преобразование в массив
					assets: item.assets.split(", "), // Преобразование в массив
				};
			});
		},

		// Меняет информацию о текущей выбранной бирже. Задаётся одиночное значение биржи
		// В payload передаётся название биржи на которую произошёл клик
		setExchange: (
			state,
			action: PayloadAction<{ mode: typeMode; value: string }>
		) => {
			const { mode, value } = action.payload;

			if (state[mode].typeExchange === "radio") {
				state[mode].activeExchange = [value];
			} else {
				if (state[mode].activeExchange.includes(value)) {
					state[mode].activeExchange = state[mode].activeExchange.filter(
						(e) => e !== value
					);
				} else {
					state[mode].activeExchange.push(value);
				}
			}
		},

		// Функция устанавливающее значение activeSettingsInfo
		setActiveSettingsInfo: (state, action: PayloadAction<typeMode>) => {
			const stateByMode = state[action.payload];
			if (stateByMode.typeExchange === "radio") {
				state.activeSettingsInfo = stateByMode.activeExchange[0];
			} else {
				state.activeSettingsInfo = stateByMode.currentData[0].exchange;
			}
		},

		// НАПИСАТЬ КОММЕНТАРИИ
		toggleCheck: (state, action: PayloadAction<IToggleCheckParams>) => {
			const { type, value } = action.payload;
			const currentData = state[state.activeMode].currentData;

			currentData.find((item) => {
				if (item.exchange === state.activeSettingsInfo) {
					if (item[type].includes(value)) {
						item[type] = item[type].filter((e) => e !== value);
					} else {
						item[type].push(value);
					}
				}
			});
		},

		// Задание активного режима
		setActiveMode: (state, action: PayloadAction<typeMode>) => {
			state.activeMode = action.payload;
		},

		// Вынесение в отдельный объект данных с текущими настройками
		setActiveCurrentData: (state, action: PayloadAction<void>) => {
			state[state.activeMode].currentData.find((item) => {
				if (item.exchange === state.activeSettingsInfo)
					state.activeCurrentData = {
						assets: item.assets,
						payTypes: item.payTypes,
					};
			});
		},
		// Внесение информации о введённой сумме
		setSum: (state, action: PayloadAction<string>) => {
			const value = Number(action.payload);

			if (!isNaN(value)) {
				if (value <= 300000) {
					state[state.activeMode].sum = String(value)
						.replace(/ /g, "")
						.replace(/^0+/, "");
				}
			}
		},

		// Преобрезование суммы к нормальному виду
		// Значение заносится в основную переменную суммы и в переменную для запросов к API
		setSumToRequest: (state, action: PayloadAction<void>) => {
			const currentData = state[state.activeMode];

			if (Number(currentData.sum) < 10000 || currentData.sum === "") {
				currentData.sum = "5000";
				currentData.sumToRequest = "5000";
			} else {
				let sum = currentData.sum.slice(0, -4) + "0000";
				currentData.sum = sum;
				currentData.sumToRequest = sum;
			}
		},
	},
});

// export const { setSettings } = settingsSlice.actions;
export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
