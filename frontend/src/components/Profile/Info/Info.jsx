import s from "./Info.module.scss";

const Info = (props) => {
  return (
    <div className={s.info}>
      <div className={s.title}>информация о подписке</div>
      <div className={s.box + " " + s.subscription}>
        <div className={s.subscription__title}>
          {props.user.access ? "standart" : "подписка не активна"}
        </div>
        <div className={s.subscription__input}>
          последная оплата<p>{props.user.access ? props.user.access : "-"}</p>
        </div>
        <div className={s.subscription__input}>
          следующая оплата<p>{props.nextPay ? props.nextPay : "-"}</p>
        </div>
        <div className={s.subscription__box}>
          <div
            className={
              props.user.access
                ? s.button + " " + s.subscription__button
                : s.button + " " + s.subscription__button + " " + s.active
            }
          >
            <button disabled className={s.button__warp}>
              сменить тариф
            </button>
            <div className={s.button__before}></div>
          </div>
          <div
            className={
              props.user.access
                ? s.button + " " + s.subscription__button
                : s.button + " " + s.subscription__button + " " + s.active
            }
          >
            <button disabled className={s.button__warp}>
              отключить подписку
            </button>
            <div className={s.button__before}></div>
          </div>
        </div>
      </div>

      {/* <div className={s.title}>партнерская программа</div>
      <div className={s.box + " " + s.partner}>
        <div className={s.partner__title}>
          твоя персональная ссылка-приглашение:
        </div>
        <div className={s.partner_input}>
          <input value={"http://miha12x4.beget.tech/default"} type="text" />
          <img src="./assets/copy.svg" alt="" />
        </div>

        <div className={s.partner__text}>
          ты получаешь <b>15%</b> с каждого платежа по подписке от людей,
          зарегистрированных по твоей ссылке
        </div>
        <div className={s.partner__inner}>
          <div className={s.partner__item}>
            <div className={s.partner__item__title}>приглашено людей:</div>
            <div className={s.partner__item__num}>0</div>
          </div>
          <div className={s.partner__item}>
            <div className={s.partner__item__title}>твой баланс:</div>
            <div className={s.partner__item__num}>
              0$
              <p>
                чтобы получить выплаты
                <br /> по партнерской программе,
                <br /> пиши в поддержку
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className={s.title}>безопасность</div>
      <form onSubmit={props.submitForm} className={s.safety}>
        <div className={s.safety__title}>изменить пароль:</div>
        <input
          onChange={props.onChangeInput}
          name="oldPass"
          value={props.passProfile.oldPass}
          type="password"
          className={s.safety__input}
          placeholder="старый пароль"
        />
        <input
          onChange={props.onChangeInput}
          name="newPass1"
          value={props.passProfile.newPass1}
          type="password"
          className={s.safety__input}
          placeholder="новый пароль"
        />
        <input
          onChange={props.onChangeInput}
          name="newPass2"
          value={props.passProfile.newPass2}
          type="password"
          className={s.safety__input}
          placeholder="повторите новый пароль"
        />
        <div className={s.button__box}>
          <div className={s.button + " " + s.safety__button}>
            <button
              type="submit"
              disabled={props.wait}
              className={s.button__warp}
            >
              сменить пароль
            </button>
            <div className={s.button__before}></div>
          </div>
          {props.errMsg && <div className={s.err__msg}>{props.errMsg}</div>}
          {props.succesMsg && <div className={s.err__msg}>{props.succesMsg}</div>}
        </div>
      </form>
    </div>
  );
};

export default Info;
