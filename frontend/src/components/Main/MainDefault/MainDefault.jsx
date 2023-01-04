import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Settings from "../Settings/Settings";
import Bundles from "../Bundles/Bundles";

import "./MainDefault.scss";

const MainDefault = (props) => {
  props.setPageTitle("default");

  const exchangeData = [
    { title: "Binance", value: "Binance" },
    { title: "Huobi", value: "Huobi" },
    { title: "Bizlato", value: "Bizlato" },
  ];

  const itemsRefExchanges = useRef([]);
  const itemsRefAssets = useRef([]);
  const itemsRefPayTypes = useRef([]);

  let checkboxState = props.checkboxState;
  let setCheckboxState = props.setCheckboxState;
  // const [checkboxState, setCheckboxState] = useState({
  //   Binance: {
  //     assets: [],
  //     payTypes: [],
  //   },
  //   Huobi: {
  //     assets: [],
  //     payTypes: [],
  //   }
  // });

  let checkboxStateExchanges = props.checkboxStateExchanges;
  let setCheckboxStateExchanges = props.setCheckboxStateExchanges;
  // const [checkboxStateExchanges, setCheckboxStateExchanges] =
  //   useState("Binance");

  let settingsSum = props.settingsSum;
  let setSettingsSum = props.setSettingsSum;
  let settingsSumData = props.settingsSumData;
  let setSettingsSumData = props.setSettingsSumData;
  // const [settingsSum, setSettingsSum] = useState(5000);
  // const [settingsSumData, setSettingsSumData] = useState(5000);
  const [intervalGetData, setIntervalGetData] = useState(undefined);
  const [newbundlesData, setNewBundlesData] = useState(undefined);
  const [originalbundlesData, setOriginalBundlesData] = useState(undefined);

  function filterData(originalData, options) {
    if (originalData !== undefined) {
      if (originalData.length !== 0) {
        let newData = originalData
          .filter((e) => filterDataInFunc(e.asset_buy, options.assets))
          .filter((e) => filterDataInFunc(e.asset_sell, options.assets))
          .filter((e) => filterDataInFunc(e.payTypes_buy, options.payTypes))
          .filter((e) => filterDataInFunc(e.payTypes_sell, options.payTypes));

        setNewBundlesData(newData);
      }
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

  function onChangeSum(e) {
    if (!isNaN(e.target.value)) {
      if (e.target.value <= 300000) {
        setSettingsSum(e.target.value.replace(/ /g, "").replace(/^0+/, ""));
      }
    }
  }

  function onKeyDownSum(e) {
    if (e.keyCode === 13) {
      sendingSum();
    }
  }

  function sendingSum() {
    let sum;
    if (settingsSum < 5000) {
      sum = "5000";
    } else if (settingsSum >= 5000 && settingsSum < 10000) {
      sum = "5000";
    } else {
      sum = settingsSum.slice(0, -4) + "0000";
    }

    if (settingsSum === undefined || settingsSum === "") {
      setSettingsSumData("5000");
      setSettingsSum("5000");
    } else {
      setSettingsSumData(sum);
      setSettingsSum(sum);
    }
  }

  useEffect(() => {
    for (const key in itemsRefAssets) {
      if (itemsRefAssets[key] != null) {
        itemsRefAssets[key].checked = false;
      }
    }
    for (const key in itemsRefAssets) {
      if (itemsRefAssets[key] != null) {
        for (const iterator of checkboxState[checkboxStateExchanges].assets) {
          if (itemsRefAssets[key].defaultValue == iterator) {
            itemsRefAssets[key].checked = true;
          }
        }
      }
    }

    for (const key in itemsRefPayTypes) {
      if (itemsRefPayTypes[key] != null) {
        itemsRefPayTypes[key].checked = false;
      }
    }
    for (const key in itemsRefPayTypes) {
      if (itemsRefPayTypes[key] != null) {
        for (const iterator of checkboxState[checkboxStateExchanges].payTypes) {
          if (itemsRefPayTypes[key].defaultValue == iterator) {
            itemsRefPayTypes[key].checked = true;
          }
        }
      }
    }

    // getData(settingsSumData, checkboxStateExchanges);
  }, [checkboxStateExchanges]);

  function onChangeExchanges(e) {
    let options = [];
    let checkboxData = onChange(e, options);
    setCheckboxStateExchanges(checkboxData[0]);

    // for (const key in itemsRefAssets) {
    //   console.log(key);
    // }
    // itemsRefPayTypes
    console.log(checkboxData[0]);
  }
  function onChangeAssets(e) {
    let checkboxData = checkboxState;
    const options = checkboxData[checkboxStateExchanges].assets;
    checkboxData[checkboxStateExchanges].assets = onChange(e, options);
    setCheckboxState(checkboxData);

    filterData(originalbundlesData, checkboxState[checkboxStateExchanges]);
  }
  function onChangePayTypes(e) {
    let checkboxData = checkboxState;
    const options = checkboxData[checkboxStateExchanges].payTypes;
    checkboxData[checkboxStateExchanges].payTypes = onChange(e, options);
    setCheckboxState(checkboxData);

    filterData(originalbundlesData, checkboxState[checkboxStateExchanges]);
  }

  // const urlGet = "../../php/getDefaultBundles-prod.php";
  const urlGet = "http://p2p-backend:8080/getDefaultBundles.php";

  const getData = async (sum, exchange) => {

    if (sum === undefined || sum === "") {
      sum = "5000";
    }
    const optionsData = new FormData();
    optionsData.set("sum", sum);
    optionsData.set("exchange", exchange);

    try {
      const response = await axios.post(urlGet, optionsData);
      // console.log(response.data);
      if (response.data.length === 0) {
        setTimeout(() => {
          getData(sum, exchange);
        }, 2000);
      } else {
        let responseResult = response.data.map((e) => {
          e.payTypes_buyText = props.payTypesData[e.payTypes_buy];
          e.payTypes_sellText = props.payTypesData[e.payTypes_sell];
          return e;
        });
        setOriginalBundlesData(responseResult);

        filterData(responseResult, checkboxState[checkboxStateExchanges]);
        console.log("Update data!");
      }
    } catch (error) {
      console.error("Ошибка в запросе!");
      console.error(error);
      console.log(optionsData);
    }
  };

  useEffect(() => {
    clearInterval(intervalGetData);
    getData(settingsSumData, checkboxStateExchanges);

    const timer = setInterval(() => {
      console.log(checkboxStateExchanges);
      getData(settingsSumData, checkboxStateExchanges);
    }, 10000)

    return () => clearInterval(timer);
  }, [settingsSumData, checkboxStateExchanges]);

  useEffect(() => {
    getData(settingsSumData, checkboxStateExchanges);
    for (let i = 0; i < 3; i++) {
      if (itemsRefExchanges[i].defaultValue == checkboxStateExchanges) {
        itemsRefExchanges[i].checked = true;
      }
    }

    const timer = setInterval(() => {
      console.log(checkboxStateExchanges);
      getData(settingsSumData, checkboxStateExchanges);
    }, 10000)

    setIntervalGetData(timer)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="main">
      <Settings
        onChangeExchanges={onChangeExchanges}
        onChangeAssets={onChangeAssets}
        onChangePayTypes={onChangePayTypes}
        onChangeSum={onChangeSum}
        settingsSumVal={settingsSum}
        onKeyDownSum={onKeyDownSum}
        blurFunc={sendingSum}
        itemsRefExchanges={itemsRefExchanges}
        itemsRefAssets={itemsRefAssets}
        itemsRefPayTypes={itemsRefPayTypes}
        exchange={checkboxStateExchanges}
        exchangeData={exchangeData}
        exchangeInputType={"radio"}
      />
      <Bundles bundlesData={newbundlesData} />
    </div>
  );
};

export default MainDefault;
