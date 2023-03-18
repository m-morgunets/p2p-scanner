import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./ErrorAuth.module.scss";

// Компонента для вывода ошибок на страницах авторизации и регистрации
const ErrorAuth = () => {
	const { errorAuth } = useAppSelector((store) => store.user);
	const { setErrorAuth } = useActions();

	return (
		<div className={styles.container}>
			<div onClick={() => setErrorAuth("")} className={styles.bg}></div>
			<div className={styles.error}>
				<div
					onClick={() => setErrorAuth("")}
					className={styles.error__close}
				></div>
				<div className={styles.error__text}>{errorAuth}</div>
			</div>
		</div>
	);
};

export default ErrorAuth;
