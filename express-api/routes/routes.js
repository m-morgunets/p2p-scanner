// Загружаем соединение с пулом MySQL
const createPool = require("../data/config");
let pool = createPool("p2p");

// Создаем пул MySQL
// const pool = mysql.createPool(config);

const router = (app) => {
	// Получаем только GET-запросы с конечной точкой "/"
	app.get("/", (req, res) => {
		res.json({
			message: "Node.js and Express REST API",
		});
	});

	// Получаем только GET-запросы с конечной точкой "/users"
	app.get("/users", (req, res) => {
		pool.query(
			"SELECT id, dateRegistration, name, email, access, subscription, lastPayDate, nextPayDate FROM users",
			(error, result) => {
				if (error) throw error;

				res.json(result);
			}
		);
	});

	// Отображение одного пользователя по ID
	app.get("/users/:id", (req, res) => {
		const id = req.params.id;

		pool.query(
			"SELECT id, dateRegistration, name, email, access, subscription, lastPayDate, nextPayDate FROM users WHERE id = ?",
			id,
			(error, result) => {
				if (error) throw error;

				res.json(result);
			}
		);
	});

	// Добавление нового пользователя
	app.post("/users", (req, res) => {
		pool.query("INSERT INTO users SET ?", req.body, (error, result) => {
			if (error) throw error;

			res.status(201).json(`User added with ID: ${result.insertId}`);
		});
	});

	// Изменение данных пользователя
	app.put("/users/:id", (req, res) => {
		const id = req.params.id;

		pool.query(
			"UPDATE users SET ? WHERE id = ?",
			[req.body, id],
			(error, result) => {
				if (error) throw error;

				res.json("User update successfully.");
			}
		);
	});

	// Удаление пользователя
	app.delete("/users/:id", (req, res) => {
		const id = req.params.id;

		pool.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
			if (error) throw error;

			res.json("User deleted.");
		});
	});
};

// Экспорт router
module.exports = router;
