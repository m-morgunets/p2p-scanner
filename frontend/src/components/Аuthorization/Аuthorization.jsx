import { Link } from "react-router-dom";
import "./Аuthorization.scss";

const Аuthorization = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="authorization"
    >
      <div className="authorization-wrapper">
        <div className="authorization-box">
          <Link to="/signup" className="authorization__subtitle">
            {"Регистрация -->"}
          </Link>
          <div className="authorization__title">p2p_scanner</div>
        </div>
        <form className="authorization-box" onSubmit={props.submitForm}>
          <input
            name="email"
            onChange={props.onChangeInput}
            value={props.formData.email}
            placeholder="email"
            type="email"
            className="authorization__input"
          />
          <input
            name="password"
            onChange={props.onChangeInput}
            value={props.formData.password}
            placeholder="password"
            type="password"
            className="authorization__input"
          />
          {props.redirect && (
            <div className="authorization__err-msg">{props.redirect}</div>
          )}
          {props.errMsg && (
            <div className="authorization__err-msg">{props.errMsg}</div>
          )}
          <div
            className={
              props.errMsg || props.redirect
                ? "authorization__btn active"
                : "authorization__btn"
            }
          >
            <button
              type="submit"
              disabled={props.wait}
              className="authorization__btn-warp"
            >
              {"start--->"}
            </button>
            <div className="authorization__btn-before"></div>
          </div>
          <Link to="/password-recovery" className="newpass">Забыли пароль?</Link>
        </form>
      </div>
    </div>
  );
};

export default Аuthorization;
