import React from "react";
import styles from "./PaySubItem.module.scss";

const PaySubItem = ({
	title,
	price,
	children,
	numDevices,
	text,
	disabledBtn,
}: {
	title: string;
	price: string;
	children?: React.ReactNode;
	numDevices: string;
	text: string;
	disabledBtn: boolean;
}) => {
	return (
		<div className={styles.item}>
			<div className={styles.title}>{title}</div>
			<div className={styles.price}>{price}</div>

			<div className={styles.list}>
				<div className={styles.list__subtitle}>режимы:</div>
				<div className={styles.list__text}>{children}</div>
			</div>

			<div className={styles.list}>
				<div className={styles.list__subtitle}>устройств:</div>
				<div className={styles.list__text}>- {numDevices}</div>
			</div>

			<div className={styles.list}>
				<div className={styles.list__subtitle}>количество дней:</div>
				<div className={styles.list__text}>- 30</div>
			</div>

			<div className={styles.pros}>
				<div className={styles.pros__box}>
					<div className={styles.pros__subtitle}>+</div>
					<div className={styles.pros__text}>закрытое комьюнити</div>
				</div>
				<div className={styles.pros__box}>
					<div className={styles.pros__subtitle}>+</div>
					<div className={styles.pros__text}>поддержка 24/7</div>
				</div>
			</div>

			<div className={styles.text}>{text}</div>

			<button disabled={disabledBtn} className={styles.button}>
				<div className={styles.button__warp}>подключить</div>
				<div className={styles.button__before}></div>
			</button>
		</div>
	);
};

export default PaySubItem;
