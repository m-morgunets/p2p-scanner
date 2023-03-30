import React, { useEffect, useState } from "react";
import Setting from "../../components/Settings/Settings";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	useGetStandardBundlesMutation,
	useGetConversionBundlesMutation,
	useGetInterexchangeBundlesMutation,
} from "../../store/bundles/bundles.api";
import Bundles from "./Bundles/Bundles";

import styles from "./Scanner.module.scss";

const Scanner = () => {
	// Добавление тегу body класса для дополнительной стилизации на конкретной странице
	useEffect(() => {
		document.body.classList.add("scanner");
		// В коцне жизненного цикла компоненты дополнительный класс удаляется
		return () => {
			document.body.classList.remove("scanner");
		};
	});

	// Поулчение экшенов
	const { setActiveCurrentData, setActiveSettingsInfo, setBundles } =
		useActions();

	// Поулчение данных из стора
	const { activeMode, activeSettingsInfo, activeCurrentData } = useAppSelector(
		(store) => store.settings
	);
	// Отдельное получение объекта по активному режиму
	const settings = useAppSelector((store) => store.settings[activeMode]);

	// При изменении режима или биржи задаётся другое название активных настроек
	useEffect(() => {
		setActiveSettingsInfo();
	}, [activeMode, settings.activeExchange]);

	// В отдельный объект выносятся данные о текущих настройках
	// Выполняется при изменении названия активных настроек или текущих настроек объекта currentData
	useEffect(() => {
		setActiveCurrentData();
	}, [activeSettingsInfo, settings.currentData]);

	// Получение функций вызова из RTKQuery
	const [requestStandardBundles] = useGetStandardBundlesMutation();
	const [requestConversionBundles] = useGetConversionBundlesMutation();
	const [requestInterexchangeBundles] = useGetInterexchangeBundlesMutation();

	// Функция вызова функции из RTKQuery
	const getBundles = () => {
		// Создание объекта с параметрами запроса
		const params = {
			exchanges: settings.activeExchange,
			sum: settings.sumToRequest,
			payTypes: activeCurrentData.payTypes,
			assets: activeCurrentData.assets,
		};
		// Вызов фукнции в зависимости от активного режима работы
		switch (activeMode) {
			case "standard":
				requestStandardBundles(params);
				break;
			case "conversion":
				requestConversionBundles(params);
				break;
			case "interexchange":
				requestInterexchangeBundles(params);
				break;

			default:
				console.error("Получение неверное значение активного режима работы сканера");
				break;
		}
	};

	// Вызов фукнции при изменении настроек
	useEffect(() => {
		getBundles();
		const handler = setInterval(() => {
			getBundles();
		}, 10000);

		return () => clearInterval(handler);
	}, [
		activeMode,
		activeSettingsInfo,
		activeCurrentData,
		settings.activeExchange,
		settings.sumToRequest,
	]);

	return (
		<section className={styles.section}>
			<Setting />
			<Bundles />
		</section>
	);
};

export default Scanner;
