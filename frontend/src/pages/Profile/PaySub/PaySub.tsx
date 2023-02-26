import React from "react";
import styles from "./PaySub.module.scss";
import PaySubItem from "./PaySubItem/PaySubItem";

const PaySub = () => {
	return (
		<section className={styles.section}>
			<div className={styles.title}>
				<p>-----------------</p> оплатить подписку <p>-----------------</p>
			</div>
			<div className={styles.inner}>
				<PaySubItem
					title="standart"
					price="50$"
					numDevices="1"
					text="весь необходимый функционал для работы со стандартными связками для одного человека с бюджетом до 200.000 рублей"
					disabledBtn={false}
				>
					- стандартный-межбиржевой
					<br />
					- конвертационный
					<br />
					<br />
					<br />
				</PaySubItem>

				<PaySubItem
					title="pro"
					price="100$"
					numDevices="3"
					text="профессиональная работа с более сложными связками, включающими обнал через Гарантекс, разные валюты, страны и так далее"
					disabledBtn={true}
				>
					- стандартный-межбиржевой
					<br />
					- конвертационный
					<br />
					- биржи + гарантекс
					<br />- Binance + BestChange
				</PaySubItem>

				<PaySubItem
					title="business"
					price="200$"
					numDevices="по запросу"
					text="решение для команд и p2p-офисов, суть которого заключается в предоставлении доступа оптом сразу нескольким сотрудникам"
					disabledBtn={true}
				>
					- стандартный-межбиржевой
					<br />
					- конвертационный
					<br />
					- биржи + гарантекс
					<br />- Binance + BestChange
				</PaySubItem>
			</div>
		</section>
	);
};

export default PaySub;
