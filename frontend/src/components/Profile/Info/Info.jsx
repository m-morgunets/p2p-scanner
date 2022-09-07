import s from "./Info.module.scss";

const Info = (props) => {
  return (
    <div className={s.info}>
      <div className={s.title}>информация о подписке</div>
      <div className={s.box + " " + s.subscription}>
        <div className={s.subscription__title}>подписка не активна</div>
        <div className={s.subscription__input}>
          последная оплата<p>-</p>
        </div>
        <div className={s.subscription__input}>
          следующая оплата<p>-</p>
        </div>
        <div className={s.subscription__box}>
          <div className={s.button + " " + s.subscription__button}>
            <button className={s.button__warp}>сменить тариф</button>
            <div className={s.button__before}></div>
          </div>
          <div className={s.button + " " + s.subscription__button}>
            <button className={s.button__warp}>отключить подписку</button>
            <div className={s.button__before}></div>
          </div>
        </div>
      </div>

      <div className={s.title}>партнерская программа</div>
      <div className={s.box + " " + s.partner}>
        <div className={s.partner__title}>
          твоя персональная ссылка-приглашение:
        </div>
        <div className={s.partner_input}>
          <input value={"http://miha12x4.beget.tech/default"} type="text" />
          <img src="./assets/copy.svg" alt="" />
        </div>

        <div className={s.partner__text}>
          ты получаешь <b>15%</b> с каждого платежа по подписке от людей, зарег
        </div>
        <div className={s.partner__inner}>
          <div className={s.partner__item}>
            <div className={s.partner__item__title}>приглашено людей:</div>
            <div className={s.partner__item__num}>2</div>
          </div>
          <div className={s.partner__item}>
            <div className={s.partner__item__title}>твой баланс:</div>
            <div className={s.partner__item__num}>
              14$
              <p>
                чтобы получить выплаты <br /> по партнерской программе, <br /> пиши в поддерж
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.title}>безопасность</div>
      <div className={s.safety}>
        <div className={s.safety__title}>изменить пароль:</div>
        <input
          type="text"
          className={s.safety__input}
          placeholder="старый пароль"
        />
        <input
          type="text"
          className={s.safety__input}
          placeholder="новый пароль"
        />
        <input
          type="text"
          className={s.safety__input}
          placeholder="повторите новый пароль"
        />
        <div className={s.button + " " + s.safety__button}>
          <button className={s.button__warp}>сменить пароль</button>
          <div className={s.button__before}></div>
        </div>
      </div>
    </div>
  );
};

export default Info;
