import Header from "../Header/Header";
import "./Support.scss";

const Support = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="support"
    >
      <Header user={props.user} />
      <div className="support-wrapper">
        <div className="support__title">как с нами связаться</div>
        <div className="support-box">
          <div className="support__subtitle">телеграм разработчика -</div>
          <a target="_blank" href="https://t.me/michael_morgunets" className="support__link">
            https://t.me/michael_morgunets
          </a>
          <p>{"< клик"}</p>
        </div>
        <div className="support__text">
          пиши по любым вопросам связанным с работой сервиса/предложениям
        </div>
      </div>
    </div>
  );
};

export default Support;
