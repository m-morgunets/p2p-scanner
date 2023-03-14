const settingsService = require("../service/settings-service");

class SettingsController {
  // Функция получения настроек
	async getSettings(req, res, next) {
		try {
			// Функция поулчения настроек
			const settings = await settingsService.getSettings();
			res.json(settings); // Отправка данных на клиент
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new SettingsController();