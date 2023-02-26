import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import styles from "./Subscription.module.scss";

const Subscription = () => {

	// Получение данных из стора
	const { access, nextPayDate, lastPayDate, subscription } = useAppSelector(
		(store) => store.user
	);

	return (
		<div className={styles.subscription}>
			<div className={styles.title}>информация о подписке</div>
			<div className={styles.box + " " + styles.subscription}>
				<div className={styles.subscription__title}>
					{access ? subscription : "подписка не активна"}
				</div>
				<div className={styles.subscription__input}>
					последная оплата<p>{access ? lastPayDate : "-"}</p>
				</div>
				<div className={styles.subscription__input}>
					следующая оплата<p>{nextPayDate ? nextPayDate : "-"}</p>
				</div>
				{/* Не выводить кнопки если access === false */}
				{access ? (
					<div className={styles.subscription__box}>
						<div className={styles.button + " " + styles.subscription__button}>
							<button disabled className={styles.button__warp}>
								сменить тариф
							</button>
							<div className={styles.button__before}></div>
						</div>
						<div className={styles.button + " " + styles.subscription__button}>
							<button disabled className={styles.button__warp}>
								отключить подписку
							</button>
							<div className={styles.button__before}></div>
						</div>
					</div>
				) : ""}
			</div>
			
		</div>
	);
};

export default Subscription;
