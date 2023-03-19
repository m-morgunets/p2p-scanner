const { mainDB } = require("../database/connect-db");

class SettingsService{
  // Функция получения настроек
	async getSettings() {
    const data = await mainDB.query("SELECT exchange, assets, payTypes FROM settings_bundles").catch(err => {throw err});
    return data;
	}
}

module.exports = new SettingsService();