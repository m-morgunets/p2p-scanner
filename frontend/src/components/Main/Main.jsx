import { useState, useEffect } from "react";
import axios from "axios";

// import Settings from "../Settings/Settings";
// import Bundles from "../Bundles/Bundles";

import "./Main.scss";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import MainDefault from "./MainDefault/MainDefault";
import MainConversion from "./MainConversion/MainConversion";

const Main = (props) => {
  const [pageTitle, setPageTitle] = useState("dafault");
  const pageTitleData = {
    default: "Стандартный",
    conversion: "Конвертационный",
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
            />
          }
        />
        <Route
          path="/conversion"
          element={
            <MainConversion
              setPageTitle={setPageTitle}
              payTypesData={payTypesData}
            />
          }
        />
        <Route path="/*" element={<Navigate to={"/default"} />} />
      </Routes>
    </div>
  );
};

export default Main;
