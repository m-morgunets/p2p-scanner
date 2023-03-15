const exchangeService = require("../service/exchange-service");

class ExchangeController {
	// Функция получение стандартных связок
	async getStandardBundles(req, res, next) {
		try {
			// Получение данных из тела запроса
			const { sum, payTypes, exchanges, assets } = req.query;

			// Функция поулчения связок
			const standardBundles = await exchangeService.getStandardBundles(sum, exchanges, payTypes, assets);
			res.json(standardBundles); // Отправка данных на клиент
		} catch (e) {
			next(e);
		}
	}

	// Получение конвертационных связок
	async getConversionBundles(req, res, next) {
		try {
			// Получение данных из тела запроса
			const { sum, payTypes, exchanges, assets } = req.query;

			// Функция поулчения связок
			const conversionBundles = await exchangeService.getConversionBundles(sum, exchanges, payTypes, assets);
			res.json(conversionBundles); // Отправка данных на клиент
		} catch (e) {
			next(e);
		}
	}

	// Получение межбиржевых связок
	async getInterexchangeBundles(req, res, next) {
		try {
			// Получение данных из тела запроса
			const { sum, payTypes, exchanges, assets } = req.query;

			// Функция поулчения связок
			const interexchangeBundles = await exchangeService.getInterexchangeBundles(sum, exchanges, payTypes, assets);
			res.json(interexchangeBundles); // Отправка данных на клиент
		} catch (e) {
			next(e);
		}
	}

	// Получение биржевых даннных
	async getExchangeData(req, res, next) {
		try {
			// Получение типа запрашиваемых данных
			const dataType = req.params.dataType;
			
			// Функция получения данных
			const exchangeData = await exchangeService.getExchangeData(dataType);
			res.json(exchangeData); // Отправка данных на клиент
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new ExchangeController();