import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import stylesAuth from "./../Аuthorization.module.scss";
import styles from "./Confirmation.module.scss";

const Confirmation = (props) => {
	// Добавление тегу body класса для дополнительной стилизации на конкретной странице
	useEffect(() => {
		document.body.classList.add("no-header");
		// В коцне жизненного цикла компоненты дополнительный класс удаляется
		return () => {
			document.body.classList.remove("no-header");
		};
	});

	const { name, email, password } = useAppSelector(
		(store) => store.user.authorization
	);
	const { setAuthName, setAuthEmail, setAuthPassword } = useActions();

	return (
		<section className={stylesAuth.section}>
			<div className={stylesAuth.wrapper}>
				<div className={stylesAuth.box}>
					<div
						onClick={props.resetCode}
						className={`${stylesAuth.subtitle} ${styles.subtitle}`}
					>
						{"<-- Вход"}
					</div>
					<div className={stylesAuth.title}>p2p_scanner</div>
				</div>
				<form
					onSubmit={props.submitForm}
					className={`${stylesAuth.box} ${styles.сonfirmation}`}
				>
					<div className={styles.text}>
						На указанную почту был отпрвален код,
						<br /> который необходимо ввести ниже:
					</div>
					<input
						name="code"
						onChange={props.onChangeInputCode}
						value={props.code}
						placeholder="000000"
						type="text"
						className={stylesAuth.input}
					/>
					{/* {props.redirect && (
						<div className={stylesAuth.err__msg}>{props.redirect}</div>
					)}
					{props.errMsg && (
						<div className={stylesAuth.err__msg}>{props.errMsg}</div>
					)} */}
					<div
						// className={
						// 	props.successMsg || props.errMsg || props.redirect
						// 		? "authorization__btn active"
						// 		: "authorization__btn"
						// }
						className={stylesAuth.btn}
					>
						<button
							type="submit"
							disabled={props.wait}
							className={stylesAuth.btn__warp}
						>
							{"Проверить"}
						</button>
						<div className={stylesAuth.btn__before}></div>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Confirmation;
