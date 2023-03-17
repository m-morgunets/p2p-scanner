import React from "react";
import { useGetExchangedataQuery } from "../../store/bundles/bundles.api";
import styles from "./Exchangedata.module.scss";

const ExchangedataTable = ({ typesQuery }: { typesQuery: String }) => {
	// Получение данных биржи
	const { isLoading, isError, data } = useGetExchangedataQuery(typesQuery);
	

	// Функция делает первый символ строки заглавным
	function ucFirst(str: String) {
		if (!str) return str; // Проверка на пустую строку
		return str[0].toUpperCase() + str.slice(1);
	}

	// Создание массива с названиями криптовалют
	let orderAsset: String[] = [];
	if (!isLoading && !isError) {
		// Заполнение массива названиями криптовалют
		for (const key in data[0]) {
			// Добавление ключа (название крпиптовалюты) в массив кроме ключа "payTypes"
			if (key !== "payTypes") orderAsset.push(key);
		}
	}

	return (
		<div className={styles.box}>
			{/* Не показывать таблицу пока не придут данные. isLoading - выдаёт true пока не пришли данные */}
			{!isLoading && (
				<table className={styles.table}>
					<tr className={styles.table__title}>
						<th className={styles.title}>{ucFirst(typesQuery)}</th>
						{/* Добавление столбцов с названиями криптовалют */}
						{orderAsset?.map((item) => (
							<th>{item}</th>
						))}
					</tr>
					{/* Добавление строк с данными */}
					{!isError ? (
						data?.map((item: any) => (
							<tr className={styles.table__line}>
								{/* Столбец с платёжной системой */}
								<td className={styles.pay__types}>{item.payTypes}</td>
								{/* Столбцы с ценами валют */}
								{orderAsset?.map((asset: any) => (
									<td>{item[asset] == 0 ? "-" : item[asset]}</td>
								))}
							</tr>
						))
					) : (
						<div className={styles.error}>Ошибка получения данных, попробуйте позже</div>
					)}
				</table>
			)}
		</div>
	);
};

export default ExchangedataTable;
