import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useSignupMutation } from "../../../store/user/user.api";
import stylesAuth from "./../Аuthorization.module.scss";
import styles from "./Signup.module.scss";

const Signup = (props) => {
	// Добавление тегу body класса для дополнительной стилизации на конкретной странице
	useEffect(() => {
		document.body.classList.add("no-header");
		// В коцне жизненного цикла компоненты дополнительный класс удаляется
		return () => {
			document.body.classList.remove("no-header");
		};
	});

	// Получение данных из store
	const { name, email, password } = useAppSelector(
		(store) => store.user.authorization
	);
	// Получение функций для сохранения данных формы в store
	const { setAuthName, setAuthEmail, setAuthPassword } = useActions();

	// Получение функции регистрации
	const [signup, { isError, isLoading }] = useSignupMutation();

	// Функция, используется при отправке формы
	const submitForm = (e) => {
		e.preventDefault();
		signup({ name, email, password });
	};

	return (
		<section className={stylesAuth.section}>
			<div className={stylesAuth.wrapper}>
				<div className={`${stylesAuth.box} ${styles.box}`}>
					<Link
						to="/login"
						className={`${stylesAuth.subtitle} ${styles.subtitle}`}
					>
						{"<-- Вход"}
					</Link>
					<div className={stylesAuth.title}>p2p_scanner</div>
				</div>
				{/* Форма регистрации */}
				<form
					onSubmit={(e) => submitForm(e)}
					className={`${stylesAuth.box} ${styles.box}`}
				>
					<input
						name="name"
						onChange={(e) => setAuthName(e.target.value)}
						value={name}
						placeholder="your name"
						type="text"
						className={stylesAuth.input}
					/>
					<input
						name="email"
						onChange={(e) => setAuthEmail(e.target.value)}
						value={email}
						placeholder="email"
						type="email"
						className={stylesAuth.input}
					/>
					<input
						name="password"
						onChange={(e) => setAuthPassword(e.target.value)}
						value={password}
						placeholder="password"
						type="password"
						className={stylesAuth.input}
					/>
					{/* {props.successMsg && (
						<div className={styles.success__msg}>{props.successMsg}</div>
					)}
					{props.errMsg && (
						<div className={stylesAuth.err__msg}>{props.errMsg}</div>
					)}
					{props.redirect && (
						<div className={stylesAuth.err__msg}>{props.redirect}</div>
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
							// disabled={props.wait}
							className={stylesAuth.btn__wrap}
						>
							{"register--->"}
						</button>
						<div className={stylesAuth.btn__before}></div>
					</div>
					<div className={styles.btn__signature}>
						регистрируясь в нашем сервисе вы подтвеждаете согласие с политикой
						обрбаотки пероснальный данных
					</div>
				</form>
			</div>
		</section>
	);
};

export default Signup;
