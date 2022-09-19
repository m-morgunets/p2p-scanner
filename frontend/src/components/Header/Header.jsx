import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__title">{props.pageTitle}</div>

      <div className="header-box">
        <NavLink
          className={props.mainPage ? "header__link active" : "header__link"}
          to="/scanner/*"
        >
          <p>{"<< открыть сканнер"}</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__link active" : "header__link"
          }
          to="/exchangedata"
        >
          <p>биржевые данные</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__link active" : "header__link"
          }
          to="/community"
        >
          <p>комьюнити</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__link active" : "header__link"
          }
          to="/support"
        >
          <p>поддержка</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "header__user active" : "header__user"
          }
          to="/profile"
        >
          <div
            className="header__user-avatar"
            // style={{ backgroundImage: `url("./assets/avatar.jpg")` }}
          ></div>
          <div className="header__user-inner">
            <div className="header__user-name">{props.user.name}</div>
            <div className="header__user-text">мой профиль</div>
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
