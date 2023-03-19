import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import LogOutButton from "../LogOutButton/LogOutButton";
import styles from "./NoActivatedEmail.module.scss";

const NoActivatedEmail = () => {
	const { email } = useAppSelector((store) => store.user.userData);

	return (
		<div className={styles.box}>
			<div className={styles.title}>
				Для продолжения работы сервиса подтвердите адрес электронной почты
			</div>
			<div className={styles.text}>
				Ссылка для подтвеждения отправлена на почту <p>«{email}»</p>
			</div>
			{/* Кнопка выхода из аккаунта */}
			<LogOutButton />
		</div>
	);
};

export default NoActivatedEmail;
