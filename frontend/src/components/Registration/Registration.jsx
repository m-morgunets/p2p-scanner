import { Link } from "react-router-dom";
import "./Registration.scss";

const Registration = (props) => {
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
          <input
            name="name"
            onChange={props.onChangeInput}
            value={props.formData.name}
            placeholder="your name"
            type="text"
            className="authorization__input"
          />
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
          {props.successMsg && (
            <div className="registration__success-msg">{props.successMsg}</div>
          )}
          {props.errMsg && (
            <div className="authorization__err-msg">{props.errMsg}</div>
          )}
          <div
            className={
              props.successMsg || props.errMsg
                ? "authorization__btn active"
                : "authorization__btn"
            }
          >
            <button
              type="submit"
              disabled={props.wait}
              className="authorization__btn-warp"
            >
              {"register--->"}
            </button>
            <div className="authorization__btn-before"></div>
            <div className="authorization__btn-signature">
              регистрируясь в нашем сервисе вы подтвеждаете согласие с политикой
              обрбаотки пероснальный данных
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
