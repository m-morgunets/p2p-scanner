import React from "react";
import { useLogoutMutation } from "../../store/user/user.api";
import styles from './LogOutButton.module.scss'

// Компонента с кнопкой выхода из аккаунта
const LogOutButton = () => {
	// Получение функции для выхода из аккаунта
	const [logout] = useLogoutMutation();
  
	return (
		<button onClick={() => logout()} className={styles.button}>
      выйти
    </button>
	);
};

export default LogOutButton;
