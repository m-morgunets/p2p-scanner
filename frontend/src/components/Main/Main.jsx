import { useState } from "react";

import "./Main.scss";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import MainDefault from "./MainDefault/MainDefault";
import MainConversion from "./MainConversion/MainConversion";
import MainInterexchange from "./MainInterexchange/MainInterexchange";

const Main = (props) => {
  const [pageTitle, setPageTitle] = useState("dafault");

  const [checkboxStateDefault, setCheckboxStateDefault] = useState({
    Binance: {
      assets: [],
      payTypes: [],
    },
    Huobi: {
      assets: [],
      payTypes: [],
    },
  });

  const [checkboxStateConversion, setCheckboxStateConversion] = useState({
    exchanges: [],
    assets: [],
    payTypes: [],
  });

  const [checkboxStateInterexchange, setCheckboxStateInterexchange] = useState({
    exchanges: [],
    assets: [],
    payTypes: [],
  });
  
  const [settingsSum, setSettingsSum] = useState(5000);
  const [settingsSumData, setSettingsSumData] = useState(5000);

  const [checkboxStateExchanges, setCheckboxStateExchanges] =
    useState("Binance");

  const pageTitleData = {
    default: "Стандартный",
    conversion: "Конвертационный",
    interexchange: "Межбиржевой",
  };

  const payTypesData = {
    TinkoffNew: "Тинькофф",
    RosBank: "Росбанк",
    RaiffeisenBankRussia: "Райффайзенбанк",
    QIWI: "QIWI",
    PostBankRussia: "Почта Банк",
    ABank: "A-Bank",
    RUBfiatbalance: "BinancePay (RUB)",
    YandexMoneyNew: "Юmoney",
    MTSBank: "МТС-Банк",
    HomeCreditBank: "Хоум Кредит Банк",
    Payeer: "Payeer",
    Advcash: "AdvCash",
    Sberbank: "Сбербанк",
    AlfaBank: "Альфа-Банк",
    VTBBANK: "ВТБ Банк",
    Sovkombank: "Совкомбанк",
    SBP: "Система быстрых платежей (СБП)",
  };

  return (
    <div>
      <Header
        pageTitle={pageTitleData[pageTitle]}
        user={props.user}
        logout={props.logout}
      />
      <Routes>
        <Route
          path="/default"
          element={
            <MainDefault
              setPageTitle={setPageTitle}
              payTypesData={payTypesData}
              checkboxState={checkboxStateDefault}
              setCheckboxState={setCheckboxStateDefault}
              settingsSum={settingsSum}
              setSettingsSum={setSettingsSum}
              settingsSumData={settingsSumData}
              setSettingsSumData={setSettingsSumData}
              checkboxStateExchanges={checkboxStateExchanges}
              setCheckboxStateExchanges={setCheckboxStateExchanges}
            />
          }
        />
        <Route
          path="/conversion"
          element={
            <MainConversion
              setPageTitle={setPageTitle}
              payTypesData={payTypesData}
              checkboxState={checkboxStateConversion}
              setCheckboxState={setCheckboxStateConversion}
              settingsSum={settingsSum}
              setSettingsSum={setSettingsSum}
              settingsSumData={settingsSumData}
              setSettingsSumData={setSettingsSumData}
            />
          }
        />
        <Route
          path="/interexchange"
          element={
            <MainInterexchange
              setPageTitle={setPageTitle}
              payTypesData={payTypesData}
              checkboxState={checkboxStateInterexchange}
              setCheckboxState={setCheckboxStateInterexchange}
              settingsSum={settingsSum}
              setSettingsSum={setSettingsSum}
              settingsSumData={settingsSumData}
              setSettingsSumData={setSettingsSumData}
            />
          }
        />
        <Route path="/*" element={<Navigate to={"/default"} />} />
      </Routes>
    </div>
  );
};

export default Main;
