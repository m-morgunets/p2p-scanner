import { Link } from "react-router-dom";
import "./Registration.scss";

const Registration = (props) => {

  return (
    <form onSubmit={props.submitForm} className="authorization registration">
      <Link to="/login" className="authorization__subtitle">Авторизоваться</Link>
      <div className="authorization__title">p2p_scanner</div>
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
      {props.successMsg && <div className="registration__success-msg">{props.successMsg}</div>}
      {props.errMsg && <div className="authorization__err-msg">{props.errMsg}</div>}
      <button disabled={props.wait} type="submit" className="authorization__btn">
        {"register"}
      </button>
    </form>
  );
};

export default Registration;
