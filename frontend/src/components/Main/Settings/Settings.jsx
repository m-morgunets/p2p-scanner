import "./Settings.scss";
import { NavLink } from "react-router-dom";
import SettingsList from "./SettingsList";

const Settings = (props) => {
  const assetData = {
    Binance: [
      { title: "USDT", value: "USDT" },
      { title: "BTC", value: "BTC" },
      { title: "BUSD", value: "BUSD" },
      { title: "BNB", value: "BNB" },
      { title: "ETH", value: "ETH" },
      { title: "RUB", value: "RUB" },
      { title: "SHIB", value: "SHIB" },
    ],
    Huobi: [
      { title: "BTC", value: "BTC" },
      { title: "USDT", value: "USDT" },
      { title: "ETH", value: "ETH" },
      { title: "HT", value: "HT" },
      { title: "EOS", value: "EOS" },
      { title: "HUSD", value: "HUSD" },
      { title: "XRP", value: "XRP" },
      { title: "LTC", value: "LTC" },
    ],
    Bizlato: [
      { title: "BTC", value: "BTC" },
      { title: "USDT", value: "USDT" },
      { title: "ETH", value: "ETH" },
      { title: "BCH", value: "BCH" },
      { title: "DASH", value: "DASH" },
      { title: "DOGE", value: "DOGE" },
      { title: "USDC", value: "USDC" },
      { title: "LTC", value: "LTC" },
    ],
    BinHuo: [
      { title: "BTC", value: "BTC" },
      { title: "USDT", value: "USDT" },
      { title: "ETH", value: "ETH" },
      { title: "LTC", value: "LTC" },
    ],
  };
  const payTypesData = {
    Binance: [
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
    ],
    Huobi: [
      { title: "Тинькофф", value: "TinkoffNew" },
      { title: "Сбербанк", value: "Sberbank" },
      { title: "Райффайзенбанк", value: "RaiffeisenBankRussia" },
      { title: "QIWI", value: "QIWI" },
      { title: "Почта Банк", value: "PostBankRussia" },
      { title: "Альфа-Банк", value: "AlfaBank" },
      { title: "ВТБ Банк", value: "VTBBANK" },
      { title: "Совкомбанк", value: "Sovkombank" },
      { title: "Система быстрых платежей (СБП)", value: "SBP" },
      { title: "Юmoney", value: "YandexMoneyNew" },
      { title: "МТС-Банк", value: "MTSBank" },
      { title: "Хоум Кредит Банк", value: "HomeCreditBank" },
      { title: "Payeer", value: "Payeer" },
      { title: "AdvCash", value: "Advcash" },
    ],
    Bizlato: [
      { title: "Тинькофф", value: "TinkoffNew" },
      { title: "Сбербанк", value: "Sberbank" },
      { title: "Райффайзенбанк", value: "RaiffeisenBankRussia" },
      { title: "QIWI", value: "QIWI" },
      { title: "Почта Банк", value: "PostBankRussia" },
      { title: "Альфа-Банк", value: "AlfaBank" },
      { title: "ВТБ Банк", value: "VTBBANK" },
      { title: "Система быстрых платежей (СБП)", value: "SBP" },
      { title: "Юmoney", value: "YandexMoneyNew" },
      { title: "МТС-Банк", value: "MTSBank" },
      { title: "Хоум Кредит Банк", value: "HomeCreditBank" },
      { title: "Payeer", value: "Payeer" },
      { title: "AdvCash", value: "Advcash" },
    ],
    BinHuo: [
      { title: "Тинькофф", value: "TinkoffNew" },
      { title: "Сбербанк", value: "Sberbank" },
      { title: "Росбанк", value: "RosBank" },
      { title: "Альфа-Банк", value: "AlfaBank" },
      { title: "ВТБ Банк", value: "VTBBANK" },
      { title: "Совкомбанк", value: "Sovkombank" },
      { title: "Система быстрых платежей (СБП)", value: "SBP" },
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
    ],
  };

  return (
    <div className="settings">
      <div className="settings__title">Режим</div>
      <ul className="settings__nav">
        <li className="settings__nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/scanner/default"
          >
            Стандартный
          </NavLink>
        </li>
        <li className="settings__nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/scanner/conversion"
          >
            Конвертационный
          </NavLink>
        </li>
        <li className="settings__nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/scanner/interexchange"
          >
            Межбиржевой
          </NavLink>
        </li>
      </ul>
      <div className="settings-box">
        <div className="settings__subtitle">Биржи:</div>
        <SettingsList
          onChangeFunc={props.onChangeExchanges}
          data={props.exchangeData}
          name={"exchange"}
          type={props.exchangeInputType}
          itemsRef={props.itemsRefExchanges}
        />
      </div>
      <div className="settings-box">
        <div className="settings__subtitle">Активы:</div>
        <SettingsList
          onChangeFunc={props.onChangeAssets}
          data={assetData[props.exchange]}
          type={"checkbox"}
          itemsRef={props.itemsRefAssets}
        />
      </div>
      <div className="settings-box">
        <div className="settings__subtitle">Платежки:</div>
        <SettingsList
          onChangeFunc={props.onChangePayTypes}
          data={payTypesData[props.exchange]}
          type={"checkbox"}
          itemsRef={props.itemsRefPayTypes}
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
