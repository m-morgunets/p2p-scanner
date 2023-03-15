import { useAppSelector } from "../../../hooks/useAppSelector";
import s from "./User.module.scss";
import avatarImg from "./../../../assets/images/avatar.jpg";

const User = () => {
	const { registrationDate, name, email, access, nextPayDate, subscription } =
		useAppSelector((store) => store.user.userData);

	return (
		<section className={s.section}>
			<div
				className={s.avatar}
				style={{ backgroundImage: `url(${avatarImg})` }}
			></div>
			<div className={s.nickname}>{name}</div>
			<div className={s.date}>зарегистрирован {registrationDate}</div>
			<div className={s.box}>
				<div className={s.item}>
					<div className={s.item__title}>e-mail:</div>
					<div className={s.item__text}>{email}</div>
				</div>
				<div className={s.item}>
					<div className={s.item__title}>подписка:</div>
					{access ? (
						<div className={s.item__text}>
							<b>{subscription}</b> до {nextPayDate}
						</div>
					) : (
						<div className={s.item__text}>не активна</div>
					)}
				</div>
				{/* <div className={s.item}>
					<div className={s.item__title}>устройства:</div>
					<div className={s.item__text}>1/3</div>
				</div> */}
			</div>
			{/* <button onClick={props.logout} className={s.button}>
				выйти
			</button> */}
		</section>
	);
};

export default User;
