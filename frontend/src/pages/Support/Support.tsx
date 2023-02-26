import React from "react";
import styles from "./Support.module.scss";

const Support = () => {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<div className={styles.title}>как с нами связаться</div>
				<div className={styles.box}>
					<div className={styles.subtitle}>телеграм разработчика -</div>
					<a
						target="_blank"
						href="https://t.me/michael_morgunets"
						className={styles.link}
					>
						https://t.me/michael_morgunets
					</a>
					<p>{"< клик"}</p>
				</div>
				<div className={styles.text}>
					пиши по любым вопросам связанным с работой сервиса/предложениям
				</div>
			</div>
		</section>
	);
};

export default Support;
