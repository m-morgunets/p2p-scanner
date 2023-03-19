import { useAppSelector } from "../../../hooks/useAppSelector";
import styles from "./User.module.scss";
import avatarImg from "./../../../assets/images/avatar.jpg";
import { useLogoutMutation } from "../../../store/user/user.api";
import LogOutButton from "../../../components/LogOutButton/LogOutButton";

const User = () => {
	// Получение данных из store
	const { registrationDate, name, email, access, nextPayDate, subscription } =
		useAppSelector((store) => store.user.userData);

	return (
		<section className={styles.section}>
			<div
				className={styles.avatar}
				style={{ backgroundImage: `url(${avatarImg})` }}
			></div>
			<div className={styles.nickname}>{name}</div>
			<div className={styles.date}>зарегистрирован {registrationDate}</div>
			<div className={styles.box}>
				<div className={styles.item}>
					<div className={styles.item__title}>e-mail:</div>
					<div className={styles.item__text}>{email}</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__title}>подписка:</div>
					{access ? (
						<div className={styles.item__text}>
							<b>{subscription}</b> до {nextPayDate}
						</div>
					) : (
						<div className={styles.item__text}>не активна</div>
					)}
				</div>
			</div>
			{/* Кнопка выхода из аккаунта */}
			<LogOutButton />
		</section>
	);
};

export default User;
