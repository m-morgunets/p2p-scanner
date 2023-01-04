import { Link } from "react-router-dom";
import "./Registration.scss";

const Confirmation = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="authorization registration"
    >
      <div className="authorization-wrapper">
        <div className="authorization-box">
          <div onClick={props.resetCode} className="authorization__subtitle">
            {"<-- Вход"}
          </div>
          <div className="authorization__title">p2p_scanner</div>
        </div>
        <form
          onSubmit={props.submitForm}
          className="authorization-box сonfirmation"
        >
          <div className="сonfirmation__text">
            На указанную почту был отпрвален код,
            <br /> который необходимо ввести ниже:
          </div>
          <input
            name="code"
            onChange={props.onChangeInputCode}
            value={props.code}
            placeholder="000000"
            type="text"
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
              {props.textBtn}
            </button>
            <div className="authorization__btn-before"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Confirmation;
