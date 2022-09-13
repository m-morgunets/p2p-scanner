import { Link } from "react-router-dom";
import "./RecoveryPass.scss";

const SetNewPass = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="authorization registration"
    >
      <div className="authorization-wrapper">
        <div className="authorization-box">
          <Link onClick={props.resetCode} to="/login" className="authorization__subtitle">
            {"<-- Вход"}
          </Link>
          <div className="authorization__title">p2p_scanner</div>
        </div>
        <form onSubmit={props.submitForm} className="authorization-box">
          <div className="recoverypass__text">
            Введите новый пароль:
          </div>
          <input
            name="password"
            onChange={props.onChangeInput}
            value={props.formData}
            placeholder="password"
            type="password"
            className="authorization__input"
          />
          {props.successMsg && (
            <div className="registration__success-msg">{props.successMsg}</div>
          )}
          {props.errMsg && (
            <div className="authorization__err-msg">{props.errMsg}</div>
          )}
          {props.redirect && (
            <div className="authorization__err-msg">{props.redirect}</div>
          )}
          <div
            className={
              props.successMsg || props.errMsg || props.redirect
                ? "authorization__btn active"
                : "authorization__btn"
            }
          >
            <button
              type="submit"
              disabled={props.wait}
              className="authorization__btn-warp"
            >
              {"final--->"}
            </button>
            <div className="authorization__btn-before"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetNewPass;
