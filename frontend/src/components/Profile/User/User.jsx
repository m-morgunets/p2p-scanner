import s from "./User.module.scss";

const User = (props) => {
  return (
    <div className={s.user}>
      <div
        className={s.avatar}
        style={{ backgroundImage: `url("./assets/avatar.jpg")` }}
      ></div>
      <div className={s.nickname}>{props.user.name}</div>
      <div className={s.date}>зарегистрирован 04.09.2022</div>
      <div className={s.box}>
        <div className={s.item}>
          <div className={s.item__title}>e-mail:</div>
          <div className={s.item__text}>{props.user.email}</div>
        </div>
        <div className={s.item}>
          <div className={s.item__title}>подписка:</div>
          <div className={s.item__text}>
            <b>pro</b> до 04.10.2022
          </div>
        </div>
        <div className={s.item}>
          <div className={s.item__title}>устройства:</div>
          <div className={s.item__text}>1/3</div>
        </div>
      </div>
      <button onClick={props.logout} className={s.button}>выйти</button>
    </div>
  );
};

export default User;
