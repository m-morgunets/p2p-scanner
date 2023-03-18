const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();

// body - валидатор для проверки параметров запроса
const { body } = require("express-validator"); 
const authMiddlewares = require("../middlewares/auth-middlewares"); 
const exchangeController = require("../controllers/exchange-controller");
const settingsControlller = require("../controllers/settings-controlller");

// Роутеры работы с пользователем
router.post(
	"/registration",
	body("name").isLength({ min: 1, max: 30 }), // Проверка имени (от 1-го до 30-ти символов)
	body("email").isEmail(), // Проверка email
	body("password").isLength({ min: 3, max: 32 }), // Проверка пароля (от 3-х до 32-х символов)
	userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddlewares, userController.getUsers);

// Роутеры получения связок
router.get("/standardbundles", authMiddlewares, exchangeController.getStandardBundles);
router.get("/conversionbundles", authMiddlewares, exchangeController.getConversionBundles);
router.get("/interexchangebundles", authMiddlewares, exchangeController.getInterexchangeBundles);
router.get("/exchangedata/:dataType", authMiddlewares, exchangeController.getExchangeData);

// Роутеры получения настроек для сортирвоки связок
router.get("/settings", settingsControlller.getSettings);

module.exports = router;
