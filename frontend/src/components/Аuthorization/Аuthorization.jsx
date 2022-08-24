import { Link } from "react-router-dom";
import "./Аuthorization.scss";

const Аuthorization = (props) => {

  return (
    <form onSubmit={props.submitForm} className="authorization">
      <Link to="/signup" className="authorization__subtitle">Зарегистрироваться</Link>
      <div className="authorization__title">p2p_scanner</div>
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
      {props.redirect && <div className="authorization__err-msg">{props.redirect}</div>}
      {props.errMsg && <div className="authorization__err-msg">{props.errMsg}</div>}
      <button disabled={props.wait} type="submit" className="authorization__btn">
        {"start--->"}
      </button>
    </form>
  );
};

export default Аuthorization;
