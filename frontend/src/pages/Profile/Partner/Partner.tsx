import React from "react";
import copySvg from './../../../assets/images/copy.svg'
import styles from './Partner.module.scss'

const Partner = () => {
	return (
		<section className={styles.section}>
			<div className={styles.title}>партнерская программа</div>
			<div className={styles.box}>
				<div className={styles.box__title}>
					твоя персональная ссылка-приглашение:
				</div>
				<div className={styles.box__input}>
					<input value={"https://github.com/m-morgunets/affiliate-program"} type="text" />
					<img src={copySvg} alt="" />
				</div>

				<div className={styles.box__text}>
					ты получаешь <b>15%</b> с каждого платежа по подписке от людей,
					зарегистрированных по твоей ссылке
				</div>
				<div className={styles.box__inner}>
					<div className={styles.box__item}>
						<div className={styles.box__item__title}>приглашено людей:</div>
						<div className={styles.box__item__num}>0</div>
					</div>
					<div className={styles.box__item}>
						<div className={styles.box__item__title}>твой баланс:</div>
						<div className={styles.box__item__num}>
							0$
							<p>
								чтобы получить выплаты
								<br /> по партнерской программе,
								<br /> пиши в поддержку
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Partner;
