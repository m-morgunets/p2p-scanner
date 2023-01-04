# p2p-scanner

Папка "frontend" - клиентская часть написанная на React.js
Папка "p2p-backend" - вся серверная логика авторизации и получения данных из БД
Папка "parsing" - python скрипты для сбора данных со всех API и расчёт связок
Файл "data-base.sql" - база данных со всеми таблицами связок и таблицей с пользователями

# Инструкция

Для начала переносим на локальный сервер (например OpenServer) папку "p2p-backend" и запускаем его. Так же переходим в phpMyAdmin сервера и импортируем все база данных из файла "data-base.sql"

Далее скачиваем весь репозиторий командой "git clone https://github.com/m-morgunets/p2p-scanner.git"
Открываем в терминале папку "frontend" и вводим команду "npm i". В этот момент скачиваются все нужные пакеты
Далее вводим команду "npm start" для запуска проекта
