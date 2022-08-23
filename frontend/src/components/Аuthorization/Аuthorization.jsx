import "./Аuthorization.scss";

const Аuthorization = (props) => {
  return (
    <div className="authorization">
      <div className="authorization__subtitle">authorization</div>
      <div className="authorization__title">p2p_scanner</div>
      <input placeholder="login" type="text" className="authorization__input" />
      <input placeholder="password" type="text" className="authorization__input" />
      <button className="authorization__btn">{"start--->"}</button>
    </div>
  );
};

export default Аuthorization;
