import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useLoginMutation } from "../../../store/user/user.api";
import styles from "./../Аuthorization.module.scss";

const Login = (props) => {
	// Добавление тегу body класса для дополнительной стилизации на конкретной странице
	useEffect(() => {
		document.body.classList.add("no-header");
		// В коцне жизненного цикла компоненты дополнительный класс удаляется
		return () => {
			document.body.classList.remove("no-header");
		};
	});
	const { email, password } = useAppSelector(
		(store) => store.user.authorization
	);
	const { setAuthEmail, setAuthPassword } = useActions();

	const [login, { isError, isLoading }] = useLoginMutation();
	
	const submitForm = async (e) => {
		e.preventDefault();
		const data = await login({ email, password });
	}

	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<div className={styles.box}>
					<Link to="/signup" className={styles.subtitle}>
						{"Регистрация -->"}
					</Link>
					<div className={styles.title}>p2p_scanner</div>
				</div>
				<form onSubmit={(e) => submitForm(e)} className={styles.box}>
					<input
						name="email"
						onChange={(e) => setAuthEmail(e.target.value)}
						value={email}
						placeholder="email"
						type="email"
						className={styles.input}
					/>
					<input
						name="password"
						onChange={(e) => setAuthPassword(e.target.value)}
						value={password}
						placeholder="password"
						type="password"
						className={styles.input}
					/>
					{/* {props.redirect && (
						<div className={styles.err__msg}>{props.redirect}</div>
					)}
					{props.errMsg && (
						<div className={styles.err__msg}>{props.errMsg}</div>
					)} */}
					<div
						// className={
						// 	props.errMsg || props.redirect
						// 		? `${styles.btn} ${styles.active}`
						// 		: styles.btn
						// }
						className={styles.btn}
					>
						<button
							type="submit"
							// disabled={props.wait}
							className={styles.btn__wrap}
						>
							{"start--->"}
						</button>
						<div className={styles.btn__before}></div>
					</div>
					{/* <Link to="/password-recovery" className={styles.newpass}>
						Забыли пароль?
					</Link> */}
				</form>
			</div>
		</section>
	);
};

export default Login;
