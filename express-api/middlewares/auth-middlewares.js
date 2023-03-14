const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
	try {
		// Получение токена из заголовков запроса
		const authorizationHeader = req.headers.authorization;
		// Проверка если такого заголовка не пришло
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError());
		}

		// Получение access токена из заголовка запроса
		const accessToken = authorizationHeader.split(" ")[1];
		// Проверка если нет токена в полученном заголовке
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		// Валидация токена (получение данных)
		const userData = tokenService.validateAccessToken(accessToken);
		// Проверка если призошла ошибка при валидации токена
		if (!userData) {
      return next(ApiError.UnauthorizedError());
		}

    req.user = userData;
    next();
	} catch (e) {
		return next(ApiError.UnauthorizedError());
	}
};
