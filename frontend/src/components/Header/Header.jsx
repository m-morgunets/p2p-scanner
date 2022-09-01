import "./Header.scss";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__title">{props.pageTitle}</div>
      <div className="header-box">
        <div className="header__name">{props.user.name}</div>
        <button className="logout" onClick={props.logout}>
          LogOut
        </button>
      </div>
    </header>
  );
};

export default Header;
