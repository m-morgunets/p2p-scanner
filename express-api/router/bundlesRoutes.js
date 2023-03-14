// Загружаем соединение с пулом MySQL
const createPool = require("../data/config");
let poolBinance = createPool("binancebundles"); // Пул базы данных 'binancebundles'
let poolHuobi = createPool("huobibundles"); // Пул базы данных 'huobibundles'
let poolBizlato = createPool("bizlatobundles"); // Пул базы данных 'bizlatobundles'
let poolConversionBundles = createPool("conversionbundles"); // Пул базы данных 'bizlatobundles'
let poolInterexchange = createPool("interexchange"); // Пул базы данных 'interexchange'
let poolExchangeData = createPool("exchangedata"); // Пул базы данных 'exchangedata'

const payTypesData = {
	TinkoffNew: "Тинькофф",
	RosBankNew: "Росбанк",
	RaiffeisenBank: "Райффайзенбанк",
	QIWI: "QIWI",
	PostBankNew: "Почта Банк",
	ABank: "A-Bank",
	RUBfiatbalance: "BinancePay (RUB)",
	YandexMoneyNew: "Юmoney",
	MTSBank: "МТС-Банк",
	HomeCreditBank: "Хоум Кредит Банк",
	Payeer: "Payeer",
	Advcash: "AdvCash",
	Sberbank: "Сбербанк",
	AlfaBank: "Альфа-Банк",
	VTBBANK: "ВТБ Банк",
	Sovkombank: "Совкомбанк",
	SBP: "Система быстрых платежей (СБП)",
};

// Функция создания текста запроса и задания параметров
function setRequestData(sum, exchange, payTypes, assets) {
	// Перевод строк с данными в массивы
	let exchangeArray = exchange.split(",");
	let payTypesArray = payTypes.split(",");
	let assetsArray = assets.split(",");

	// Задание начала запроса
	let query = "SELECT * FROM bundles_?";
	// Задание пустого массива для внесения частей запроса
	let queryParams = [];
	// Задание массива с данными для запроса
	let value = [Number(sum)];

	// Если массив с данными бирж не пустой, то включить его в запрос
	if (exchange.length !== 0) {
		// Добавление строки запроса
		queryParams.push("exchange_buy IN (?) && exchange_sell IN (?)");
		// Добавление данных запроса
		value.push(exchangeArray, exchangeArray);
	}

	// Если массив с данными платёжных систем не пустой, то включить его в запрос
	if (payTypes.length !== 0) {
		// Добавление строки запроса
		queryParams.push("payTypes_buy IN (?) && payTypes_sell IN (?)");
		// Добавление данных запроса
		value.push(payTypesArray, payTypesArray);
	}

	// Если массив с данными криптовалют не пустой, то включить его в запрос
	if (assets.length !== 0) {
		// Добавление строки запроса
		queryParams.push("asset_buy IN (?) && asset_sell IN (?)");
		// Добавление данных запроса
		value.push(assetsArray, assetsArray);
	}

	// Если массив с частями запроса не пустой, то добавить его в основную строку запроса
	if (queryParams.length !== 0) {
		query += " WHERE " + queryParams.join(" && ");
	}
	// Добавление в конце строки запроса параметра для сортировки "от большего к меньшему"
	query += " ORDER BY liquidity DESC";

	// Вывод объекта со строкой запроса и данными для запроса
	return {
		query,
		value,
	};
}

const router = (app) => {
	// Получение обычных связок
	app.get("/bundles/:exchange", (req, res) => {
		const { query, value } = setRequestData(
			req.query.sum,
			req.params.exchange,
			req.query.payTypes,
			req.query.assets
		);

		// Выполняемая функция после запроса
		const queryFunc = (error, result) => {
			if (error) throw error;

			res.json(result);
		};

		switch (req.params.exchange) {
			// Запрос а базе данных со связками Binance
			case "binance":
				poolBinance.query(query, value, queryFunc);
				break;

			// Запрос а базе данных со связками Huobi
			case "huobi":
				poolHuobi.query(query, value, queryFunc);
				break;

			// Запрос а базе данных со связками Bizlato
			case "bizlato":
				poolBizlato.query(query, value, queryFunc);
				break;

			// Если ни одно из значений не совпало с параметром
			default:
				res.json({ message: "Не верный параметр биржи" });
				break;
		}
	});

	// Получение конвертационных связок
	app.get("/conversionbundles", (req, res) => {
		const { query, value } = setRequestData(
			req.query.sum,
			req.query.exchanges,
			req.query.payTypes,
			req.query.assets
		);

		poolConversionBundles.query(query, value, (error, result) => {
			if (error) throw error;

			res.json(result);
		});
	});

	// Получение межбиржевых связок
	app.get("/interexchange", (req, res) => {
		const { query, value } = setRequestData(
			req.query.sum,
			req.query.exchanges,
			req.query.payTypes,
			req.query.assets
		);

		poolInterexchange.query(query, value, (error, result) => {
			if (error) throw error;

			res.json(result);
		});
	});

	// Получение биржевых даннных
	app.get("/exchangedata/:dataType", (req, res) => {
		poolExchangeData.query(
			`SELECT * FROM ${req.params.dataType}`,
			(error, result) => {
				if (error) throw error;

				result.map((item) => {
					item.payTypes = payTypesData[item.payTypes];
					return item;
				});

				res.json(result);
			}
		);
	});
};

module.exports = router;

// Получение связок + получение информации какие криптовалюты и платёжные системы есть в связках
// case "binance":
// let data = {};
// poolBinance.query(query, value, (error, result) => {
// 	if (error) throw error;

// 	data.bundles = result;

// 	poolBinance.query(
// 		"SELECT DISTINCT payTypes_buy FROM bundles_5000",
// 		(error, result) => {
// 			if (error) throw error;
// 			let arr = [];
// 			for (const iterator of result) {
// 				for (const key in iterator) {
// 					const element = iterator[key];
// 					arr.push(element);
// 				}
// 			}
// 			data.payTypes = arr;

// 			poolBinance.query(
// 				"SELECT DISTINCT asset_buy FROM bundles_5000",
// 				(error, result) => {
// 					if (error) throw error;

// 					let arr = [];
// 					for (const iterator of result) {
// 						for (const key in iterator) {
// 							const element = iterator[key];
// 							arr.push(element);
// 						}
// 					}
// 					data.assets = arr;

// 					res.json(data);
// 				}
// 			);
// 		}
// 	);
// });
// break;
