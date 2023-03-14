const connectDataBase = require("../data/config_db");

class ExchangeService {
	// Функция создания текста запроса и задания параметров
	static setRequestData(sum, exchange, payTypes, assets) {
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
			value.push(exchange, exchange);
		}

		// Если массив с данными платёжных систем не пустой, то включить его в запрос
		if (payTypes.length !== 0) {
			// Добавление строки запроса
			queryParams.push("payTypes_buy IN (?) && payTypes_sell IN (?)");
			// Добавление данных запроса
			value.push(payTypes, payTypes);
		}

		// Если массив с данными криптовалют не пустой, то включить его в запрос
		if (assets.length !== 0) {
			// Добавление строки запроса
			queryParams.push("asset_buy IN (?) && asset_sell IN (?)");
			// Добавление данных запроса
			value.push(assets, assets);
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

	// Функция получение стандартных связок
	async getStandardBundles(sum, exchange, payTypes, assets) {
		const { query, value } = ExchangeService.setRequestData(sum, exchange, payTypes, assets);

		switch (exchange[0]) {
			// Запрос а базе данных со связками Binance
			case "binance":
				const dataBinance = await connectDataBase('binancebundles').query(query, value).catch(err => {throw err});
        return dataBinance;

			// Запрос а базе данных со связками Huobi
			case "huobi":
				const dataHuobi = await connectDataBase('huobibundles').query(query, value).catch(err => {throw err});
        return dataHuobi;

			// Запрос а базе данных со связками Bizlato
			case "bizlato":
				const dataBizlato = await connectDataBase('bizlatobundles').query(query, value).catch(err => {throw err});
        return dataBizlato;

			// Если ни одно из значений не совпало с параметром
			default:
				throw new Error("Не верный параметр биржи");
		}
	}

  // Получение конвертационных связок
  async getConversionBundles(sum, exchange, payTypes, assets) {
		const { query, value } = ExchangeService.setRequestData(sum, exchange, payTypes, assets);
    
    const data = await connectDataBase('conversionbundles').query(query, value).catch(err => {throw err});
    return data;
  }

  // Получение межбиржевых связок
  async getInterexchangeBundles(sum, exchange, payTypes, assets) {
		const { query, value } = ExchangeService.setRequestData(sum, exchange, payTypes, assets);

    const data = await connectDataBase('interexchange').query(query, value).catch(err => {throw err});
    return data;
  }

	// Получение биржевых даннных
	async getExchangeData(dataType) {
		const data = await connectDataBase('exchangedata').query(`SELECT * FROM ${dataType}`).catch(err => {throw err});
		return data;
	}

}

module.exports = new ExchangeService();