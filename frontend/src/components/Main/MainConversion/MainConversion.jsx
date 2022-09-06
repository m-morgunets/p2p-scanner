import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Settings from "../Settings/Settings";
import Bundles from "../Bundles/Bundles";

import "./MainConversion.scss";

const MainConversion = (props) => {
  props.setPageTitle("conversion");

  const exchangeData = [
    { title: "Binance", value: "Binance" },
  ];

  const itemsRefExchanges = useRef([]);
  const itemsRefAssets = useRef([]);
  const itemsRefPayTypes = useRef([]);

  const [checkboxStateExchanges, setCheckboxStateExchanges] =
    useState("Binance");
  let checkboxState = props.checkboxState;
  let setCheckboxState = props.setCheckboxState;
  // const [checkboxState, setCheckboxState] = useState({
  //   exchanges: [],
  //   assets: [],
  //   payTypes: [],
  // });

  let settingsSum = props.settingsSum
  let setSettingsSum = props.setSettingsSum
  let settingsSumData = props.settingsSumData
  let setSettingsSumData = props.setSettingsSumData
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
      setSettingsSumData("5000")
      setSettingsSum("5000")
    } else {
      setSettingsSumData(sum)
      setSettingsSum(sum)
    }
  }

  function onChangeExchanges(e) {
    let checkboxData = checkboxState;
    const options = checkboxData.exchanges;
    checkboxData.exchanges = onChange(e, options);
    setCheckboxState(checkboxData);
  }
  function onChangeAssets(e) {
    let checkboxData = checkboxState;
    const options = checkboxData.assets;
    checkboxData.assets = onChange(e, options);
    setCheckboxState(checkboxData);

    filterData(originalbundlesData, checkboxState);
  }
  function onChangePayTypes(e) {
    let checkboxData = checkboxState;
    const options = checkboxData.payTypes;
    checkboxData.payTypes = onChange(e, options);
    setCheckboxState(checkboxData);

    filterData(originalbundlesData, checkboxState);
  }

  // const urlGet = "../../php/getConverBundles-prod.php";
  const urlGet = "http://p2p-backend:8080/getConverBundles.php";

  const getData = async (sum) => {
    try {
      if (sum === undefined || sum === "") {
        sum = "5000";
      }
      const optionsData = new FormData();
      optionsData.set("sum", sum);
      const response = await axios.post(urlGet, optionsData);
      if (response.data.length === 0) {
        setTimeout(() => {
          getData(sum);
        }, 1000);
      } else {
        let responseResult = response.data.map((e) => {
          e.payTypes_buyText = props.payTypesData[e.payTypes_buy];
          e.payTypes_sellText = props.payTypesData[e.payTypes_sell];
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
    clearInterval(intervalGetData);
    getData(settingsSumData);

    const timer = setInterval(() => {
      console.log(settingsSumData);
      getData(settingsSumData);
    }, 10000)

    return () => clearInterval(timer);
  }, [settingsSumData]);


  useEffect(() => {
    getData(settingsSumData);
    itemsRefExchanges[0].checked = true;

    for (let key in itemsRefAssets) {
      if (itemsRefAssets[key] != null) {
        for (const iterator of checkboxState.assets) {
          if (itemsRefAssets[key].defaultValue == iterator) {
            itemsRefAssets[key].checked = true;
          }
        }
      }
    }
    for (let key in itemsRefPayTypes) {
      if (itemsRefPayTypes[key] != null) {
        for (const iterator of checkboxState.payTypes) {
          if (itemsRefPayTypes[key].defaultValue == iterator) {
            itemsRefPayTypes[key].checked = true;
          }
        }
      }
    }


    const timer = setInterval(() => {
      console.log(intervalGetData);
      getData(settingsSumData);
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
        exchange={checkboxStateExchanges}
        exchangeData={exchangeData}
        itemsRefExchanges={itemsRefExchanges}
        itemsRefAssets={itemsRefAssets}
        itemsRefPayTypes={itemsRefPayTypes}
        exchangeInputType={"radio"}
      />
      <Bundles logout={props.logout} bundlesData={newbundlesData} />
    </div>
  );
};

export default MainConversion;
