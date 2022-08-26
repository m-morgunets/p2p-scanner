import { useState, useEffect } from "react";
import axios from "axios";

import Settings from "./Settings/Settings";
import Bundles from "./Bundles/Bundles";

import "./Main.scss";

const Main = (props) => {
  const [checkboxState, setCheckboxState] = useState({
    exchanges: [],
    assets: [],
    payTypes: [],
  });
  const [newbundlesData, setNewBundlesData] = useState(undefined);
  const [originalbundlesData, setOriginalBundlesData] = useState(undefined);

  const payTypesData = {
    Tinkoff: "Тинькофф",
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

  function filterData(originalData, options) {
    if (originalData.length !== 0 && originalData !== undefined) {
      let newData = originalData
        .filter((e) => filterDataInFunc(e.asset_buy, options.assets))
        .filter((e) => filterDataInFunc(e.asset_sell, options.assets))
        .filter((e) => filterDataInFunc(e.payTypes_buy, options.payTypes))
        .filter((e) => filterDataInFunc(e.payTypes_sell, options.payTypes));

      setNewBundlesData(newData);
    }

    function filterDataInFunc(dataItem, optionItem) {
      if (optionItem.length !== 0) {
        for (const iterator of optionItem) {
          if (dataItem === iterator) {
            return true;
          }
        }
      } else return true;
      return false;
    }
  }

  function onChange(e, options) {
    let index;
    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }
    return options;
  }

  function onChangeExchanges(e) {
    let checkboxData = checkboxState;
    const options = checkboxData.exchanges;
    checkboxData.exchanges = onChange(e, options);
    setCheckboxState(checkboxData);
    console.log(checkboxData.exchanges);
    // getData();
  }
  function onChangeAssets(e) {
    let checkboxData = checkboxState;
    const options = checkboxData.assets;
    checkboxData.assets = onChange(e, options);
    setCheckboxState(checkboxData);
    console.log(checkboxData.assets);

    filterData(originalbundlesData, checkboxState);
  }
  function onChangePayTypes(e) {
    let checkboxData = checkboxState;
    const options = checkboxData.payTypes;
    checkboxData.payTypes = onChange(e, options);
    setCheckboxState(checkboxData);
    console.log(checkboxData.payTypes);

    filterData(originalbundlesData, checkboxState);
  }

  // const urlGet = "localhost/php/getBundles-prod.php";
  const urlGet = "../../php/getBundles-prod.php";
  // const urlGet = "http://p2p-backend:8080/getBundles.php";

  const getData = async () => {
    try {
      const response = await axios.get(urlGet);
      if (response.data.length === 0) {
        setTimeout(() => {
          getData();
        }, 1000);
      } else {
        let responseResult = response.data.map((e) => {
          e.payTypes_buyText = payTypesData[e.payTypes_buy];
          e.payTypes_sellText = payTypesData[e.payTypes_sell];
          return e;
        });
        setOriginalBundlesData(responseResult);

        filterData(responseResult, checkboxState);
        console.log("Update data!");
      }
    } catch (error) {
      console.error("Ошибка в запросе!");
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    setInterval(() => {
      getData();
    }, 10000);
  }, []);

  return (
    <div className="Main">
      <header className="header">
        <div className="header-box">
          <div className="header__name">{props.user.name}</div>
          <button className="logout" onClick={props.logout}>
            LogOut
          </button>
        </div>
      </header>
      <Settings
        onChangeExchanges={onChangeExchanges}
        onChangeAssets={onChangeAssets}
        onChangePayTypes={onChangePayTypes}
      />
      <Bundles logout={props.logout} bundlesData={newbundlesData} />
    </div>
  );
};

export default Main;
