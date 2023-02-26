import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import styles from "./Bundles.module.scss";

const Bundles = () => {
	const { bundles } = useAppSelector((store) => store.bundles);

	return (
		<div className={styles.bundles}>
			<table className={styles.table}>
				<tr className={styles.table__title}>
					<th colSpan={4}>
						Покупаем <p>как Тейкер</p>
					</th>
					<th colSpan={5}>
						Продаем <p>как Мейкер</p>
					</th>
				</tr>
				<tr className={styles.table__subtitle}>
					<th>Биржа</th>
					<th>Актив</th>
					<th>Цена</th>
					<th>Платежка</th>
					<th>Биржа</th>
					<th>Актив</th>
					<th>Цена</th>
					<th>Платежка</th>
					<th>Спред</th>
				</tr>
				{bundles?.map((item) => (
					<tr className={styles.table__item}>
						<td>{item.exchange_buy}</td>
						<td>{item.asset_buy}</td>
						<td>{Math.floor(item.price_buy * 100000) / 100000}</td>
						<td>{item.payTypes_buy}</td>
						<td>{item.exchange_sell}</td>
						<td>{item.asset_sell}</td>
						<td>{Math.floor(item.price_sell * 100000) / 100000}</td>
						<td>{item.payTypes_sell}</td>
						<td>{Math.floor(item.liquidity * 100) / 100} %</td>
					</tr>
				))}
			</table>
		</div>
	);
};

export default Bundles;
