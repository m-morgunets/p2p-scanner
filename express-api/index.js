require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./router");
const errorMiddlewares = require("./middlewares/error-middlewares");
const connectDataBase = require("./database/config-db");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use("/api", router);
app.use(errorMiddlewares);

// Запуск сервера
const server = app.listen(PORT, (error) => {
	if (error) return console.log(`Error: ${error}`);

	console.log(`Server listening on port ${server.address().port}`);
});
