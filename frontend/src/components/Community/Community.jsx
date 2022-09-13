import Header from "../Header/Header";
import "./Community.scss";

const Community = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
      className="community"
    >
      <Header user={props.user} />
      <div className="community-wrapper">
        <div className="community__title">залетай в нашу тусовку в телеграме</div>

        <div className="community-box">
          <div className="community__subtitle">телеграм-канал проекта -</div>
          <a target="_blank" href="https://t.me/p2p_scanner_ru" className="community__link">
            https://t.me/p2p_scanner_ru
          </a>
          <p>{"< клик"}</p>
        </div>

        <div className="community-box">
          <div className="community__subtitle">телеграм-чат -</div>
          <a target="_blank" href="https://t.me/p2p_chat_ru" className="community__link">
            https://t.me/p2p_chat_ru
          </a>
          <p>{"< клик"}</p>
        </div>

      </div>
    </div>
  );
};

export default Community;
