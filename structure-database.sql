-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Сен 18 2022 г., 12:41
-- Версия сервера: 5.7.27-30
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `u1655934_defaultbundles`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_5000`
--

CREATE TABLE `bundles_5000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_10000`
--

CREATE TABLE `bundles_10000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_20000`
--

CREATE TABLE `bundles_20000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_30000`
--

CREATE TABLE `bundles_30000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_40000`
--

CREATE TABLE `bundles_40000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_50000`
--

CREATE TABLE `bundles_50000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_60000`
--

CREATE TABLE `bundles_60000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_70000`
--

CREATE TABLE `bundles_70000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_80000`
--

CREATE TABLE `bundles_80000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_90000`
--

CREATE TABLE `bundles_90000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_100000`
--

CREATE TABLE `bundles_100000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_110000`
--

CREATE TABLE `bundles_110000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_120000`
--

CREATE TABLE `bundles_120000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_130000`
--

CREATE TABLE `bundles_130000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_140000`
--

CREATE TABLE `bundles_140000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_150000`
--

CREATE TABLE `bundles_150000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_160000`
--

CREATE TABLE `bundles_160000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_170000`
--

CREATE TABLE `bundles_170000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_180000`
--

CREATE TABLE `bundles_180000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_190000`
--

CREATE TABLE `bundles_190000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_200000`
--

CREATE TABLE `bundles_200000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_210000`
--

CREATE TABLE `bundles_210000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_220000`
--

CREATE TABLE `bundles_220000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_230000`
--

CREATE TABLE `bundles_230000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_240000`
--

CREATE TABLE `bundles_240000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_250000`
--

CREATE TABLE `bundles_250000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_260000`
--

CREATE TABLE `bundles_260000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_270000`
--

CREATE TABLE `bundles_270000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_280000`
--

CREATE TABLE `bundles_280000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_290000`
--

CREATE TABLE `bundles_290000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `bundles_300000`
--

CREATE TABLE `bundles_300000` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `exchange_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_buy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_buy` double NOT NULL,
  `exchange_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payTypes_sell` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_sell` double NOT NULL,
  `liquidity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bundles_5000`
--
ALTER TABLE `bundles_5000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_10000`
--
ALTER TABLE `bundles_10000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_20000`
--
ALTER TABLE `bundles_20000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_30000`
--
ALTER TABLE `bundles_30000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_40000`
--
ALTER TABLE `bundles_40000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_50000`
--
ALTER TABLE `bundles_50000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_60000`
--
ALTER TABLE `bundles_60000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_70000`
--
ALTER TABLE `bundles_70000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_80000`
--
ALTER TABLE `bundles_80000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_90000`
--
ALTER TABLE `bundles_90000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_100000`
--
ALTER TABLE `bundles_100000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_110000`
--
ALTER TABLE `bundles_110000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_120000`
--
ALTER TABLE `bundles_120000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_130000`
--
ALTER TABLE `bundles_130000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_140000`
--
ALTER TABLE `bundles_140000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_150000`
--
ALTER TABLE `bundles_150000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_160000`
--
ALTER TABLE `bundles_160000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_170000`
--
ALTER TABLE `bundles_170000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_180000`
--
ALTER TABLE `bundles_180000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_190000`
--
ALTER TABLE `bundles_190000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_200000`
--
ALTER TABLE `bundles_200000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_210000`
--
ALTER TABLE `bundles_210000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_220000`
--
ALTER TABLE `bundles_220000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_230000`
--
ALTER TABLE `bundles_230000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_240000`
--
ALTER TABLE `bundles_240000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_250000`
--
ALTER TABLE `bundles_250000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_260000`
--
ALTER TABLE `bundles_260000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_270000`
--
ALTER TABLE `bundles_270000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_280000`
--
ALTER TABLE `bundles_280000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_290000`
--
ALTER TABLE `bundles_290000`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bundles_300000`
--
ALTER TABLE `bundles_300000`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bundles_5000`
--
ALTER TABLE `bundles_5000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_10000`
--
ALTER TABLE `bundles_10000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_20000`
--
ALTER TABLE `bundles_20000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_30000`
--
ALTER TABLE `bundles_30000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_40000`
--
ALTER TABLE `bundles_40000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_50000`
--
ALTER TABLE `bundles_50000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_60000`
--
ALTER TABLE `bundles_60000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_70000`
--
ALTER TABLE `bundles_70000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_80000`
--
ALTER TABLE `bundles_80000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_90000`
--
ALTER TABLE `bundles_90000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_100000`
--
ALTER TABLE `bundles_100000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_110000`
--
ALTER TABLE `bundles_110000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_120000`
--
ALTER TABLE `bundles_120000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_130000`
--
ALTER TABLE `bundles_130000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_140000`
--
ALTER TABLE `bundles_140000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_150000`
--
ALTER TABLE `bundles_150000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_160000`
--
ALTER TABLE `bundles_160000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_170000`
--
ALTER TABLE `bundles_170000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_180000`
--
ALTER TABLE `bundles_180000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_190000`
--
ALTER TABLE `bundles_190000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_200000`
--
ALTER TABLE `bundles_200000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_210000`
--
ALTER TABLE `bundles_210000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_220000`
--
ALTER TABLE `bundles_220000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_230000`
--
ALTER TABLE `bundles_230000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_240000`
--
ALTER TABLE `bundles_240000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_250000`
--
ALTER TABLE `bundles_250000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_260000`
--
ALTER TABLE `bundles_260000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_270000`
--
ALTER TABLE `bundles_270000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_280000`
--
ALTER TABLE `bundles_280000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_290000`
--
ALTER TABLE `bundles_290000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `bundles_300000`
--
ALTER TABLE `bundles_300000`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
