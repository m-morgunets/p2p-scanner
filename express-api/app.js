// Получаем модуль express
const express = require("express");
// Получаем модуль для разбора тела запроса
const bodyParser = require("body-parser");

// Получаем вынутренние файл из папки routes
const routes = require("./routes/routes");
const bundlesRoutes = require("./routes/bundlesRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// Устанавливаем порт
const port = 5000;

const app = express();

app.use(express.json({ extended: true }));

// Использование body-parser для разбора тела запроса
// parse application/json
app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

routes(app);
bundlesRoutes(app);
settingsRoutes(app);

// Запуск сервера
const server = app.listen(port, (error) => {
	if (error) return console.log(`Error: ${error}`);

	console.log(`Server listening on port ${server.address().port}`);
});
