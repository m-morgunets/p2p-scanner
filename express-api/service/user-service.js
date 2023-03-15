const connection = require("../data/config_db");
const userdb = connection("p2p"); // Использование фукнции для создания связи с базой данных

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dots");
const ApiError = require("../exceptions/api-error");

class UserService {
	async registration(name, email, password) {

		// Отправка запроса на получение данных пользователя по email
		const [checkingUser] = await userdb.query('SELECT * FROM users WHERE email=?', email).catch(err => {throw err});

		// Проверка если данные пользователя не пустые, то выдаём ошибку,
		// что пользователь уже существует в БД
		if (checkingUser) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адресом ${email} уже существует`
			);
		}
		
		// Хешируем пароль
		const hashPassword = await bcrypt.hash(password, 3);
		// Создание ссылки для активации почты
		const activationLink = uuid.v4();
		// Создаём нового пользователя в БД
		await userdb.query('INSERT INTO users(name, email, password, activationEmailLink) VALUES (?)', [[name, email, hashPassword, activationLink]]).catch(err => {throw err});

		// // Функция отправки письма активации
		await mailService.sendActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		// Отправка запроса на получение данных пользователя по email
		const [user] = await userdb.query('SELECT * FROM users WHERE email=?', email).catch(err => {throw err});

		// Создание объекта с данными (отбрасываются данные которые не нужны на клиенте)
		const userDto = new UserDto(user); // id, email, isActivated
		// Функция создание токенов 
		const tokens = tokenService.generateTokens({ ...userDto });
		// Сохранение токена в базе данных
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDto,
		};
	}

	async login(email, password) {
		// Отправка запроса на получение данных пользователя по email
		const [user] = await userdb.query('SELECT * FROM users WHERE email=?', email).catch(err => {throw err});

		// Проверка если данные пользователя пустые, то выдаём ошибку,
		// что записи о пользователе не существует
		if (!user) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`);
		}

		// Сравнение пароля из запроса и из базы данных
		const isPassEquels = await bcrypt.compare(password, user.password)
		if(!isPassEquels) {
			throw ApiError.BadRequest('Неверный пароль');
		}

		// Создание объекта с данными (отбрасываются данные которые не нужны на клиенте)
		const userDto = new UserDto(user); // id, email, isActivated
		// Функция создание токенов 
		const tokens = tokenService.generateTokens({ ...userDto });
		// Сохранение токена в базе данных
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	// Функция выхода пользователя из аккаунта 
	async logout(refreshToken) {
		// Вызов функции удаления токена
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	// Функция проверки ссылки активации почты
	async activate(activationLink) {
		// Получение записи о пользователе по ссылке активации
		const [user] = await userdb.query('SELECT * FROM users WHERE activationEmailLink=?', activationLink).catch(err => {throw err});

		// Если пользователь не найден, то выводится ошибка что ссылка не корректная
		if (!user) {
			throw ApiError.BadRequest('Неккоректная ссылка активации');
		}

		// Если пользователь найден, то меняется значение столбца об активации почты в значение true
		await userdb.query('UPDATE users SET isActivatedEmail=true WHERE activationEmailLink=?', activationLink).catch(err => {throw err});
	}

	// Функция обновления токена
	async refresh(refreshToken) {
		// Проверка, что пришёл refreshToken
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		// Получение данных пользователя из refreshToken-а
		const userData = tokenService.validateRefreshToken(refreshToken);
		// Функция получение записи с токеном из БД
		const tokenFromDb = await tokenService.findToken(refreshToken);
		// Проверка, если токен не валидный или нет записи о неём в БД, то выдаётся ошибка
		if(!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		// Отправка запроса на получение данных пользователя по id
		const [user] = await userdb.query('SELECT * FROM users WHERE id=?', userData.id).catch(err => {throw err});

		// Создание объекта с данными (отбрасываются данные которые не нужны на клиенте)
		const userDto = new UserDto(user); // id, email, isActivated
		// Функция создание токенов 
		const tokens = tokenService.generateTokens({ ...userDto });
		// Сохранение токена в базе данных
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDto,
		};
	}

	// Функция получение списка всех пользователей
	async getAllUsers() {
		const [users] = await userdb.query('SELECT * FROM users').catch(err => {throw err});
		return users;
	}
}

module.exports = new UserService();
