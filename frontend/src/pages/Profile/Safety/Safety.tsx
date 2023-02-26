import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import styles from "./Safety.module.scss";

const Safety = () => {
	// Получение данных из стора
	const {} = useAppSelector((store) => store.user);

	return (
		<section className={styles.section}>
			<div className={styles.title}>безопасность</div>
			<form className={styles.safety__form}>
				<div className={styles.safety__title}>изменить пароль:</div>
				<input
					name="oldPass"
					type="password"
					className={styles.safety__input}
					placeholder="старый пароль"
				/>
				<input
					name="newPass1"
					type="password"
					className={styles.safety__input}
					placeholder="новый пароль"
				/>
				<input
					name="newPass2"
					type="password"
					className={styles.safety__input}
					placeholder="повторите новый пароль"
				/>
				<div className={styles.button__box}>
					<div className={styles.button + " " + styles.safety__button}>
						<button
							type="submit"
							// disabled={props.wait}
							className={styles.button__warp}
						>
							сменить пароль
						</button>
						<div className={styles.button__before}></div>
					</div>
					{/* {props.errMsg && <div className={styles.err__msg}>{props.errMsg}</div>}
          {props.succesMsg && <div className={styles.err__msg}>{props.succesMsg}</div>} */}
				</div>
			</form>
		</section>
	);
};

export default Safety;
