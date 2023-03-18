import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorAuth from "../../../components/ErrorAuth/ErrorAuth";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useLoginMutation } from "../../../store/user/user.api";
import { UserErrors } from "../../../types/errors";
import styles from "./../Аuthorization.module.scss";

const Login = () => {
	// Добавление тегу body класса для дополнительной стилизации на конкретной странице
	useEffect(() => {
		document.body.classList.add("no-header");
		// В коцне жизненного цикла компоненты дополнительный класс удаляется
		return () => {
			document.body.classList.remove("no-header");
		};
	}, []);

	// Получение данных из store
	const {
		authorization: { email, password },
		isLoading,
		errorAuth,
	} = useAppSelector((store) => store.user);
	// Получение функций для сохранения данных формы в store
	const { setAuthEmail, setAuthPassword, setIsLoading, setErrorAuth } =
		useActions();

	// Получение функции авторизации
	const [login] = useLoginMutation();

	// Функция, используется при отправке формы
	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Запрос на авторизацию с перехватом ошибок
		await login({ email, password })
			.unwrap()
			.catch((error: UserErrors) => {
				setErrorAuth(error.data.message);
			});
		setIsLoading(false);
	};

	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<div className={styles.box}>
					<Link
						// Очищение сообщений об ошибках при переходе между страницами
						onClick={() => setErrorAuth("")}
						to="/signup"
						className={styles.subtitle}
					>
						{"Регистрация -->"}
					</Link>
					<div className={styles.title}>p2p_scanner</div>
				</div>
				{/* Форма авторизации */}
				<form onSubmit={(e) => submitForm(e)} className={styles.box}>
					{errorAuth && <ErrorAuth />}
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
					<div className={styles.btn}>
						<button
							type="submit"
							disabled={isLoading}
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
