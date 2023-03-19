const connectDataBase = require("./config-db");

// Соединения со всеми базами данных, которые используются
const mainDB = connectDataBase("p2p");

const binancebundlesDB = connectDataBase("binancebundles");
const huobibundlesDB = connectDataBase("huobibundles");
const bizlatobundlesDB = connectDataBase("bizlatobundles");
const conversionbundlesDB = connectDataBase("conversionbundles");
const interexchangeDB = connectDataBase("interexchange");
const exchangedataDB = connectDataBase("exchangedata");

// Экспорт соединений с базами данных
module.exports = {
	mainDB,
	binancebundlesDB,
	huobibundlesDB,
	bizlatobundlesDB,
	conversionbundlesDB,
	interexchangeDB,
	exchangedataDB,
};