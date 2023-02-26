const mysql = require("mysql");

// Задаём данные для подключения к базе данных
const config = {
	host: "127.0.0.1",
	user: "root",
	password: "root",
};

function createPool(databaseName) {
	config.database = databaseName;
	// Создаем пул MySQL
	return mysql.createPool(config);
}

// Экспортируем функцию создания пула
module.exports = createPool;
