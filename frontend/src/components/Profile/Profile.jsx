import Header from "../Header/Header";
import Info from "./Info/Info";
import "./Profile.scss";
import Subscription from "./Subscription/Subscription";
import User from "./User/User";

const Profile = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="profile"
    >
      <Header user={props.user}/>
      <div className="profile-inner">
        <div className="profile__box">
          <Subscription />
          <Info />
        </div>
        <div className="profile__box">
          <User user={props.user} logout={props.logout} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
