import s from "./User.module.scss";

const User = (props) => {
  let dateReg = props.user.dateRegistration;
  dateReg = dateReg.split("-");
  dateReg = [dateReg[2].split(" ")[0], dateReg[1], dateReg[0]].join(".");

  let subsciption;
  if (props.user.access) {
    subsciption = (
      <div className={s.item__text}>
        <b>standart</b> до {props.nextPay}
      </div>
    );
  } else {
    subsciption = <div className={s.item__text}>не активна</div>;
  }

  return (
    <div className={s.user}>
      <div
        className={s.avatar}
        // style={{ backgroundImage: `url("./assets/avatar.jpg")` }}
      ></div>
      <div className={s.nickname}>{props.user.name}</div>
      <div className={s.date}>зарегистрирован {dateReg}</div>
      <div className={s.box}>
        <div className={s.item}>
          <div className={s.item__title}>e-mail:</div>
          <div className={s.item__text}>{props.user.email}</div>
        </div>
        <div className={s.item}>
          <div className={s.item__title}>подписка:</div>
          {subsciption}
        </div>
        {/* <div className={s.item}>
          <div className={s.item__title}>устройства:</div>
          <div className={s.item__text}>1/3</div>
        </div> */}
      </div>
      <button onClick={props.logout} className={s.button}>
        выйти
      </button>
    </div>
  );
};

export default User;
