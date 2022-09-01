import "./Settings.scss";
import { NavLink } from "react-router-dom";
import SettingsList from "./SettingsList";

const Settings = (props) => {
  const exchangeData = [{ title: "Binance", value: "Binance" }];
  const assetData = [
    { title: "USDT", value: "USDT" },
    { title: "BTC", value: "BTC" },
    { title: "BUSD", value: "BUSD" },
    { title: "BNB", value: "BNB" },
    { title: "ETH", value: "ETH" },
    { title: "RUB", value: "RUB" },
    { title: "SHIB", value: "SHIB" },
  ];
  const payTypesData = [
    { title: "Тинькофф", value: "TinkoffNew" },
    { title: "Росбанк", value: "RosBank" },
    { title: "Райффайзенбанк", value: "RaiffeisenBankRussia" },
    { title: "QIWI", value: "QIWI" },
    { title: "Почта Банк", value: "PostBankRussia" },
    { title: "A-Bank", value: "ABank" },
    { title: "BinancePay (RUB)", value: "RUBfiatbalance" },
    { title: "Юmoney", value: "YandexMoneyNew" },
    { title: "МТС-Банк", value: "MTSBank" },
    { title: "Хоум Кредит Банк", value: "HomeCreditBank" },
    { title: "Payeer", value: "Payeer" },
    { title: "AdvCash", value: "Advcash" },
  ];

  return (
    <div className="settings">
      <div className="settings__title">Режим</div>
      <ul className="settings__nav">
        <li className="settings__nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/default"
          >
            Стандартный
          </NavLink>
        </li>
        <li className="settings__nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/conversion"
          >
            Конвертационный
          </NavLink>
        </li>
      </ul>
      <div className="settings-box">
        <div className="settings__subtitle">Биржи:</div>
        <SettingsList
          onChangeFunc={props.onChangeExchanges}
          data={exchangeData}
        />
      </div>
      <div className="settings-box">
        <div className="settings__subtitle">Активы:</div>
        <SettingsList onChangeFunc={props.onChangeAssets} data={assetData} />
      </div>
      <div className="settings-box">
        <div className="settings__subtitle">Платежки:</div>
        <SettingsList
          onChangeFunc={props.onChangePayTypes}
          data={payTypesData}
        />
      </div>
      <div className="settings-box">
        <div className="settings__subtitle">Сумма (от 5к до 300к):</div>
        <div className="settings__input">
          <input
            value={props.settingsSumVal}
            onKeyDown={props.onKeyDownSum}
            onBlur={props.blurFunc}
            onChange={props.onChangeSum}
            type="text"
          />{" "}
          <p>RUB</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
