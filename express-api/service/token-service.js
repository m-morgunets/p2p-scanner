const { mainDB } = require("../database/connect-db");

const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");

class TokenService {
	// Создание пары access и refresh токенов
	generateTokens(payload) {
		// Создание токена. В параметрах передаются данные, секретный ключ, и время жизни токена
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "30m",
		});
		// Создание токена. В параметрах передаются данные, секретный ключ, и время жизни токена
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "30d",
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	// Сохранение refresh токена в базе данных
	async saveToken(userId, refreshToken) {
		// Получение данных о токене по id пользователя
		const [checkingToken] = await mainDB.query('SELECT * FROM token WHERE userId=?', userId).catch(err => {throw err});

		// Проверка если данные о токене не пустые, то обновляем refresh токен
		if (checkingToken) {
			await mainDB.query('UPDATE token SET refreshToken=? WHERE userId=?', [refreshToken, userId]).catch(err => {throw err});
			return;
		}

		// Содание записи о новом пользователе и его refresh токен
		await mainDB.query('INSERT INTO token(userId, refreshToken) VALUES (?)', [[userId, refreshToken]]).catch(err => {throw err});
	}

	// Функция удаления refresh токена из базы данных
	async removeToken(refreshToken) {
		// Удаление записи с refresh токеном
		const tokenData = await mainDB.query('DELETE FROM token WHERE refreshToken=?', refreshToken)
			.catch(err => {throw ApiError.BadRequest("Такого токена не существует в БД")});
		return tokenData;
	}

	// Функция валидации access токена
	validateAccessToken(token) {
		try {
			// Верификация токена. В качестве параметров принимает сам токен и секретный ключ
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}
	
	// Функция валидации refresh токена
	validateRefreshToken(token) {
		try {
			// Верификация токена. В качестве параметров принимает сам токен и секретный ключ
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	// Функция получение записи с токеном из БД
	async findToken(refreshToken) {
		// Получение записи по refreshToken-у
		const [tokenData] = await mainDB.query('SELECT * FROM token WHERE refreshToken=?', refreshToken).catch(err => {throw err});
		return tokenData;
	}
}

module.exports = new TokenService();
