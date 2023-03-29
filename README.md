# Сервис получения p2p-связок

## Кратко

Папка "frontend" - клиентская часть написанная на React.js <br>
Папка "express-api" - вся серверная логика авторизации и получения данных из БД <br>
Папка "parsing" - python скрипты для сбора данных со всех API и расчёт связок <br>
Файл "data-base.sql" - база данных со всеми таблицами связок и таблицей с пользователями <br>

## Данные от аккаунта в сканере

Логин: admin@admin.com <br>
Пароль: admin

## Что сканер умеет

1. Функционал авторизации и регистрации
2. Работа с JWT токенами
3. Доступ к определённым функциям сайта в зависимости от уровня доступа
4. Вывод запрашиваемых связок
5. Фильтрация связок в зависимости от заданных настроек

## Технологии

```plaintext
Node.js (v18.12.1) : среда выполнения;
React.js (v18.0.26) : клиентская часть;
Express.js (v4.18.2) : серверная часть;
MySQL (v5.7.38) : базы данных;
TypeScript (v4.9.3) : типизация JS-кода;
Redux Toolkit (v1.9.1) : стейт-менеджмент и запросы;
Sass (v8.0.0) : написание CSS-стилей сайта;
```

## Как связаться со мной:
[![](/screenshots/telegram.png)](https://t.me/m_morgunets) [![](/screenshots/hh.png)](https://yaroslavl.hh.ru/applicant/resumes/view?resume=e5c06f44ff0bd0a4010039ed1f7a68336e5a66)

## Скриншоты приложения

![](/screenshots/screenshot-1.png)
> Страница входа в аккаунт

![](/screenshots/screenshot-2.png)
> Страница регистрации

![](/screenshots/screenshot-3.png)
> Основная страница с выводом связок

![](/screenshots/screenshot-4.png)
> Страница с выводом биржевых данных

![](/screenshots/screenshot-5.png)
> Страница Profile пользователя без подписки

![](/screenshots/screenshot-6.png)
> Страница Profile пользователя с подпиской
