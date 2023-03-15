const userService = require("../service/user-service");

const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
	async registration(req, res, next) {
		try {
			// Получение результатов валидации
			const errors = validationResult(req);
			// Проверка не является ли массв ошибок пустым
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}

			// Получение данных из тела запроса
			const { name, email, password,  } = req.body;
			// Вызов функции регистрации
			const userData = await userService.registration(name, email, password);
			// Отправка refreshToken-а в куки
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, // Кука живёт 30 дней
				httpOnly: true, // Запрет изменения с помощью js
			});
			// Отправка данных на клиент
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			// Получение данных из тела запроса
			const { email, password } = req.body;
			// Вызов функции авторизации
			const userData = await userService.login(email, password);
			// Отправка refreshToken-а в куки
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, // Кука живёт 30 дней
				httpOnly: true, // Запрет изменения с помощью js
			});
			// Отправка данных на клиент
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logout(req, res, next) {
		try {
			// Получение refreshToken-а из куков
			const {refreshToken} = req.cookies;
			// Вызов функции выхода из аккаунта
			const token = await userService.logout(refreshToken);
			// Удаление куки
			res.clearCookie('refreshToken');
			return res.json(token)
		} catch (e) {
			next(e);
		}
	}

	async activate(req, res, next) {
		try {
			// Получение ссылки из параметров запроса
			const activationLink = req.params.link;

			// Вызов функции активации
			await userService.activate(activationLink);
			// Редирект пользователя на основную страницу клиентской части
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}

	async refresh(req, res, next) {
		try {
			// Получение refreshToken-а из куков
			const {refreshToken} = req.cookies;
			// Вызов функции обновления токена
			const userData = await userService.refresh(refreshToken);
			// Отправка refreshToken-а в куки
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, // Кука живёт 30 дней
				httpOnly: true, // Запрет изменения с помощью js
			});
			// Отправка данных на клиент
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers(); 
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
