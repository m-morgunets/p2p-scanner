// Создаем сервер с HTTP-модулем Node
const http = require("http");
const port = 3001;
const server = http.createServer();

server.on("request", (request, response) => {
	console.log(`URL ${request.url}`);
	response.end("Hello, server!");
});

// Запуск сервера
server.listen(port, (error) => {
	if (error) return console.log(`Error: ${error}`);

	console.log(`Server is listening on port ${port}`);
});
