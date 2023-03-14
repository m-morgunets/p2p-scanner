const connectDataBase = require("../data/config_db");

class SettingsService{
  // Функция получения настроек
	async getSettings() {
    const data = await connectDataBase('p2p').query("SELECT exchange, assets, payTypes FROM settings_bundles").catch(err => {throw err});
    return data;
	}
}

module.exports = new SettingsService();