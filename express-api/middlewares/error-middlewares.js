const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
  console.log(err);
  // Проверка принадлежит ли ошибка классу ApiError
  if(err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }
  // Если проверка выше выдала false, то выводится сообщение о неизвестной ошибке 
  return res.status(500).json({message: 'Непредвиденная ошибка'})
}