import Header from "../Header/Header";
import "./NoAccess.scss";

const NoAccess = (props) => {
  return (
    <div className="noaccess">
      <Header user={props.user} logout={props.logout} />
      <div className="noaccess__title">У вас нет доступа к сервису</div>
    </div>
  );
};

export default NoAccess;
