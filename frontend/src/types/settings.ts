// Тип данных приходящих с api при запросе данных настроек
export interface IRespInfoBundles {
	exchange: string;
	payTypes: string;
	assets: string;
}

// Режимы работы сканера
export type typeMode = "standard" | "conversion" | "interexchange";

// Данные каждго режима работы сканера
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

// Тип отдельного объекта
export interface ISettingsInfoItem {
	payTypes: string[];
	assets: string[];
}