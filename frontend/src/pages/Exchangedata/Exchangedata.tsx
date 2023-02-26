import React from "react";
import { useGetExchangedataQuery } from "../../store/bundles/bundles.api";
import styles from "./Exchangedata.module.scss";
import ExchangedataTable from "./ExchangedataTable";

const Exchangedata = () => {
	// Получение данных о курсе криптовалюты (по маркету)
	const {
		isLoading,
		isError,
		data: currenciesData,
	} = useGetExchangedataQuery("currenciesdata");

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={`${styles.box} ${styles.conversion}`}>
					<div className={styles.title}>
						Курс обмена валюты внутри Binance: <p>(по маркету)</p>
					</div>
					{/* Таблица с данными о курсе криптовалют */}
					{/* Не показывать таблицу пока не придут данные. isLoading - выдаёт true пока не пришли данные*/}
					{!isError ? (
						!isLoading && (
							<table className={styles.table}>
								<tr className={styles.table__title}>
									<th></th>
									<th>Курс</th>
								</tr>
								{currenciesData?.map((item: any) => (
									<tr className={styles.table__line}>
										<td>
											<p>{item.asset_1}</p>
											{"-->"}
											<p>{item.asset_2}</p>
										</td>
										<td>{item.price}</td>
									</tr>
								))}
							</table>
						)
					) : (
						<div className={styles.error}>
							Ошибка получения данных, попробуйте позже
						</div>
					)}
				</div>

				<div className={styles.subtitle}>Курс в P2P торговле:</div>

				{/* Таблицы с данными при p2p торговле на различных биржах */}
				<ExchangedataTable typesQuery={"binance"} />
				<ExchangedataTable typesQuery={"huobi"} />
				<ExchangedataTable typesQuery={"bizlato"} />
			</div>
		</section>
	);
};

export default Exchangedata;
