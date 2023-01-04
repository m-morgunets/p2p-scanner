import { Link } from "react-router-dom";
import "./RecoveryPass.scss";

const RecoveryPass = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="authorization registration"
    >
      <div className="authorization-wrapper">
        <div className="authorization-box">
          <Link to="/login" className="authorization__subtitle">
            {"<-- Вход"}
          </Link>
          <div className="authorization__title">p2p_scanner</div>
        </div>
        <form onSubmit={props.submitForm} className="authorization-box">
          <div className="recoverypass__text">
            Введите почту на которую <br /> зарегистрирован аккаунт:
          </div>
          <input
            name="email"
            onChange={props.onChangeInput}
            value={props.formData}
            placeholder="email"
            type="email"
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
              {"next--->"}
            </button>
            <div className="authorization__btn-before"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPass;
