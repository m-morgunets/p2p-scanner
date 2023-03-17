import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./Header.module.scss";
import HeaderLink from "./HeaderLink/HeaderLink";
import avatarImg from "./../../assets/images/avatar.jpg";

const Header = () => {
	const { name, access } = useAppSelector((store) => store.user.userData);
	const { activeMode, modes } = useAppSelector((store) => store.settings);

	return (
		<header className={styles.header}>
			<div className={styles.header_title}>
				{modes.find((item) => item.value === activeMode)?.name}
			</div>

			<div className={styles.header_box}>
				{/* Если у пользователя нет подписки, то не выводить две данные кнопки */}
				{access ? (
					<>
						<HeaderLink link={"/scanner"} title="<< открыть сканнер" />
						<HeaderLink link={"/exchangedata"} title="биржевые данные" />
					</>
				) : ""}
				<HeaderLink link={"/community"} title="комьюнити" />
				<HeaderLink link={"/support"} title="поддержка" />

				<NavLink
					className={({ isActive }) =>
						isActive
							? `${styles.header_user} ${styles.active}`
							: styles.header_user
					}
					to="/profile"
				>
					<div
						className={styles.header_user_avatar}
						style={{ backgroundImage: `url(${avatarImg})` }}
					></div>
					<div className={styles.header_user_inner}>
						<div className={styles.header_user_name}>{name}</div>
						<div className={styles.header_user_text}>мой профиль</div>
					</div>
				</NavLink>
			</div>
		</header>
	);
};

export default Header;
