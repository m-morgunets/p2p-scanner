import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { store } from "../../store";
import { getSettingsInfo } from "../../store/settings/settings.slice";
import styles from "./Setting.module.scss";

const Settings = () => {
	// Получение данных из стора
	const {
		settingsInfo,
		modes,
		activeMode,
		activeSettingsInfo,
		activeCurrentData,
	} = useAppSelector((store) => store.settings);
	const settings = useAppSelector((store) => store.settings[activeMode]);

	// Получение экшенов из стора
	const {
		setExchange,
		toggleCheck,
		setActiveMode,
		setSum,
		setActiveSettingsInfo,
		setSumToRequest,
	} = useActions();

	// Функции запроса к бекенду для получения информации о настройках
	useEffect(() => {
		store.dispatch(getSettingsInfo());
	}, []);

	// const setSumFunc = () => {
	// 	if (Number(settings.sum) < 10000 || settings.sum === "") {
	// 		setSum("5000");
	// 	} else {
	// 		let sum = settings.sum.slice(0, -4) + "0000";
	// 		setSum(sum);
	// 	}
	// };

	return (
		<section className={styles.section}>
			<div className={styles.modes}>
				<div className={styles.title}>Режим</div>
				<ul className={styles.nav}>
					{modes?.map((item) => (
						<li
							onClick={() => setActiveMode(item.value)}
							className={
								item.value === activeMode
									? `${styles.nav__item} ${styles.active}`
									: styles.nav__item
							}
						>
							{item.name}
						</li>
					))}
				</ul>
			</div>
			<div className={styles.box}>
				<div className={styles.subtitle}>Биржи:</div>
				<div className={styles.list}>
					{/* Перебор массива доступых бирж для генерации radio-кнопок */}
					{settings.exchanges?.map((item: any) => (
						<div className={styles.list__item}>
							<label>
								<input
									name="exchange"
									onChange={(e) =>
										setExchange({ mode: activeMode, value: e.target.value })
									}
									type={"checkbox"}
									value={item}
									// Проверяет есть ли элемент в массиве выбранных активов
									checked={settings.activeExchange.includes(item)}
								/>{" "}
								<p>{item}</p>
							</label>
						</div>
					))}
				</div>
			</div>
			<div className={styles.box}>
				<div className={styles.subtitle}>Активы:</div>
				<div className={styles.list}>
					{/* Перебор массива информации о доступных активах для генерации radio-кнопок */}
					{settingsInfo[activeSettingsInfo]?.assets.map((item: any) => (
						<div className={styles.list__item}>
							<label>
								<input
									name="assets"
									// Функция добавления/удаления элементов в массиве
									// Передаёт режим сканера, тип настроек и значение элемента на который произошёл клик
									onChange={(e) =>
										toggleCheck({
											type: "assets",
											value: e.target.value,
										})
									}
									type={"checkbox"}
									value={item}
									// Проверяет есть ли элемент в массиве выбранных активов
									checked={activeCurrentData?.assets?.includes(item)}
								/>{" "}
								<p>{item}</p>
							</label>
						</div>
					))}
				</div>
			</div>
			<div className={styles.box}>
				<div className={styles.subtitle}>Платежки:</div>
				<div className={styles.list}>
					{/* Перебор массива информации о доступных платёжных системах для генерации radio-кнопок */}
					{settingsInfo[activeSettingsInfo]?.payTypes.map((item: any) => (
						<div className={styles.list__item}>
							<label>
								<input
									name="payTypes"
									// Функция добавления/удаления элементов в массиве
									// Передаёт режим сканера, тип настроек и значение элемента на который произошёл клик
									onChange={(e) =>
										toggleCheck({
											type: "payTypes",
											value: e.target.value,
										})
									}
									type={"checkbox"}
									value={item}
									// Проверяет есть ли элемент в массиве выбранных платёжных систем
									checked={activeCurrentData?.payTypes?.includes(item)}
								/>{" "}
								<p>{item}</p>
							</label>
						</div>
					))}
				</div>
			</div>
			<div className={styles.box}>
				<div className={styles.subtitle}>Сумма (от 5к до 300к):</div>
				<div className={styles.sum}>
					<input
						value={settings.sum}
						onChange={(e) => {
							setSum(e.target.value);
						}}
						onBlur={() => setSumToRequest()}
						onKeyDown={(e) => {
							if (e.key === "Enter") setSumToRequest();
						}}
						type="text"
					/>{" "}
					<p>RUB</p>
				</div>
			</div>
		</section>
	);
};

export default Settings;
