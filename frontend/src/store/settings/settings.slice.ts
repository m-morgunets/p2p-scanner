import { IModeItem, IRespInfoBundles, ISettingsInfoItem, typeMode } from "../../types/settings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Интерфейс всего стейта
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

	// dispath получается из параметра thunkAPI
	async (parameters: void, { dispatch }) => {
		// Запрос для получения настроек
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

		// Заносит данные о настройках, полученные с помощью асинхронной операции getInfoBundles
		setSettings: (state, action: PayloadAction<IRespInfoBundles[]>) => {
			// Занесение данных в стейт по ключу "action.payload.exchange" из пришедших данных
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

			// Проверка какой режим работы сканера выборан
			// Условие выдаст true, если в режиме работы сканера доступен выбор только одной биржи
			if (state[mode].typeExchange === "radio") {
				// Занесение данных о биржи в сейт
				state[mode].activeExchange = [value];
			} else {
				// Проверка существует ли такая биржа в массиве
				if (state[mode].activeExchange.includes(value)) {
					// Если существует, то удаляется с помощью фильтра
					state[mode].activeExchange = state[mode].activeExchange.filter(
						(e) => e !== value
					);
				} else {
					// Если нет, то добавляется в массив
					state[mode].activeExchange.push(value);
				}
			}
		},

		// Функция устанавливающее значение activeSettingsInfo
		// activeSettingsInfo - название активной биржи для получения настроек, которые пришли из api
		setActiveSettingsInfo: (state, action: PayloadAction<void>) => {

			// Получение стейта текущего режима работы сканера
			const stateByMode = state[state.activeMode];

			// Проверка какой режим работы сканера выборан
			// Условие выдаст true, если в режиме работы сканера доступен выбор только одной биржи
			// Занесение данных отличается из-за первоначальной архитектуры данных в стейте
			if (stateByMode.typeExchange === "radio") {
				// Занесение данных в стейт
				state.activeSettingsInfo = stateByMode.activeExchange[0];
			} else {
				// Занесение данных в стейт
				state.activeSettingsInfo = stateByMode.currentData[0].exchange;
			}
		},

		// Переключене checkbox-кнопок в настройках
		toggleCheck: (state, action: PayloadAction<IToggleCheckParams>) => {
			const { type, value } = action.payload;

			// Получение объекта данных о текущих настройках у текущего режима работы сканера
			const currentData = state[state.activeMode].currentData;

			// Перебор данных
			currentData.find((item) => {
				// Поиск объекта выбранной биржи
				if (item.exchange === state.activeSettingsInfo) {
					// Проверка существует ли такая биржа в массиве
					if (item[type].includes(value)) {
						// Если существует, то удаляется с помощью фильтра
						item[type] = item[type].filter((e) => e !== value);
					} else {
						// Если нет, то добавляется в массив
						item[type].push(value);
					}
				}
			});
		},

		// Задание активного режима работы сканера
		setActiveMode: (state, action: PayloadAction<typeMode>) => {
			state.activeMode = action.payload;
		},

		// Вынесение в отдельный объект данных с текущими настройками
		setActiveCurrentData: (state, action: PayloadAction<void>) => {
			// Получение объекта данных о текущих настройках у текущего режима работы сканера
			const currentData = state[state.activeMode].currentData;

			// Перебор данных
			currentData.find((item) => {
				// Поиск объекта выбранной биржи
				if (item.exchange === state.activeSettingsInfo)
					// Задание данных в объект текущих активных настроек выводимых на экран 
					state.activeCurrentData = {
						assets: item.assets,
						payTypes: item.payTypes,
					};
			});
		},

		// Внесение информации о введённой сумме
		setSum: (state, action: PayloadAction<string>) => {
			const value = Number(action.payload);

			// Проверка является ли числом
			if (!isNaN(value)) {
				// Запрет на ввод числа больше указаного
				if (value <= 300000) {
					// Внесение данных о сумме в объект текущего режима работы сканера
					// Также строка очищается от пробелов и лишних символов с помощью регулярных выражений
					state[state.activeMode].sum = String(value)
						.replace(/ /g, "")
						.replace(/^0+/, "");
				}
			}
		},

		// Преобрезование суммы к нормальному виду
		// Значение заносится в основную переменную суммы и в переменную для запросов к API
		setSumToRequest: (state, action: PayloadAction<void>) => {

			// Получение стейта текущего режима работы сканера
			const stateByMode = state[state.activeMode];

			// Преобразование числа к нужному виду
			if (Number(stateByMode.sum) < 10000 || stateByMode.sum === "") {
				stateByMode.sum = "5000";
				stateByMode.sumToRequest = "5000";
			} else {
				let sum = stateByMode.sum.slice(0, -4) + "0000";
				stateByMode.sum = sum;
				stateByMode.sumToRequest = sum;
			}
		},
	},
});

// export const { setSettings } = settingsSlice.actions;
export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
