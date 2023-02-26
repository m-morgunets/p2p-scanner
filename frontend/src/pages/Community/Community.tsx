import React from "react";
import styles from "./Community.module.scss";

const Community = () => {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<div className={styles.title}>
					залетай в нашу тусовку в телеграме
				</div>

				<div className={styles.box}>
					<div className={styles.subtitle}>
						телеграм-канал проекта -
					</div>
					<a
						target="_blank"
						href="https://t.me/p2p_scanner_ru"
						className={styles.link}
					>
						https://t.me/p2p_scanner_ru
					</a>
					<p>{"< клик"}</p>
				</div>

				<div className={styles.box}>
					<div className={styles.subtitle}>телеграм-чат -</div>
					<a
						target="_blank"
						href="https://t.me/p2p_chat_ru"
						className={styles.link}
					>
						https://t.me/p2p_chat_ru
					</a>
					<p>{"< клик"}</p>
				</div>
			</div>
		</section>
	);
};

export default Community;
