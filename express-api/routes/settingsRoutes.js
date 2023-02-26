// Загружаем соединение с пулом MySQL
const createPool = require("../data/config");

let pool = createPool("p2p"); // Пул базы данных 'p2p'

const router = (app) => {
	// Получение настроек по конкретной бирже
	app.get("/settings", (req, res) => {
		pool.query(
			"SELECT exchange, assets, payTypes FROM settings_bundles",
			(error, result) => {
				if (error) throw error;

				res.json(result);
			}
		);
	});
};

module.exports = router;
