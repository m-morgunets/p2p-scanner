const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();

// body - валидатор для проверки параметров запроса
const { body } = require("express-validator"); 
const authMiddlewares = require("../middlewares/auth-middlewares"); 
const exchangeController = require("../controllers/exchange-controller");
const settingsControlller = require("../controllers/settings-controlller");

// Роутинги пользователя
router.post(
	"/registration",
	body("email").isEmail(), // Проверка email
	body("password").isLength({ min: 3, max: 32 }), // Проверка пароля (от 3х до 32х символов)
	userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddlewares, userController.getUsers);

// Роутинги полчения связок
router.get("/standardbundles", exchangeController.getStandardBundles);
router.get("/conversionbundles", exchangeController.getConversionBundles);
router.get("/interexchangebundles", exchangeController.getInterexchangeBundles);
router.get("/exchangedata/:dataType", exchangeController.getExchangeData);

// Роутинг получения настроек поиска
router.get("/settings", settingsControlller.getSettings);

module.exports = router;
