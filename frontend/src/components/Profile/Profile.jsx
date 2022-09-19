import { useState } from "react";
import Header from "../Header/Header";
import Info from "./Info/Info";
import "./Profile.scss";
import Subscription from "./Subscription/Subscription";
import User from "./User/User";

const Profile = (props) => {
  const [mainPage, setMainPage] = useState(!props.user.access);

  // let nextPay;
  // if (props.user.access !== null) {
  //   let datePay = props.user.access.split(".");
  //   datePay = [datePay[1], datePay[0], datePay[2]].join(".");
  //   nextPay = new Date(datePay);
  //   nextPay.setDate(nextPay.getDate() + 30);
  //   let nextPayArr = [
  //     String(nextPay.getDate()).length < 2
  //       ? "0" + nextPay.getDate()
  //       : nextPay.getDate(),
  //     nextPay.getMonth() + 1,
  //     nextPay.getFullYear(),
  //   ];
  //   nextPay = nextPayArr.join(".");
  // } else {
  //   nextPay = null;
  // }

  let nextPay  = null;

  if (props.user.access !== null) {
    const datePay = props.user.access.split(".");
    nextPay = new Date(datePay[2], --datePay[1], +datePay[0] + 3);
    nextPay = [
      `${nextPay.getDate() < 10 ? "0" : ""}${nextPay.getDate()}`,
      `${nextPay.getMonth() + 1 < 10 ? "0" : ""}${nextPay.getMonth() + 1}`,
      nextPay.getFullYear(),
    ].join(".");
  }

  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="profile"
    >
      <Header user={props.user} mainPage={mainPage} />
      <div className="profile-inner">
        <div className="profile__box">
          {!props.user.access && <Subscription />}
          <Info
            errMsg={props.errMsg}
            submitForm={props.submitForm}
            onChangeInput={props.onChangeInput}
            passProfile={props.passProfile}
            nextPay={nextPay}
            user={props.user}
            wait={props.wait}
            succesMsg={props.succesMsg}
          />
        </div>
        <div className="profile__box">
          <User nextPay={nextPay} user={props.user} logout={props.logout} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
