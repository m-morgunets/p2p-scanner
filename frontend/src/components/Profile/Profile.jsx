import { useState } from "react";
import Header from "../Header/Header";
import Info from "./Info/Info";
import "./Profile.scss";
import Subscription from "./Subscription/Subscription";
import User from "./User/User";

const Profile = (props) => {
  const [mainPage, setMainPage] = useState(!props.user.access);

  // let nextPay  = null;

  // if (props.user.access !== null) {
  //   const datePay = props.user.access.split(".");
  //   nextPay = new Date(datePay[2], --datePay[1], +datePay[0] + 3);
  //   nextPay = [
  //     `${nextPay.getDate() < 10 ? "0" : ""}${nextPay.getDate()}`,
  //     `${nextPay.getMonth() + 1 < 10 ? "0" : ""}${nextPay.getMonth() + 1}`,
  //     nextPay.getFullYear(),
  //   ].join(".");
  // }

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
            nextPay={props.user.endingSub}
            user={props.user}
            wait={props.wait}
            succesMsg={props.succesMsg}
          />
        </div>
        <div className="profile__box">
          <User nextPay={props.user.endingSub} user={props.user} logout={props.logout} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
