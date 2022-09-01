import { useState, useEffect } from "react";
import axios from "axios";

import Settings from "../Settings/Settings";
import Bundles from "../Bundles/Bundles";

import "./MainConversion.scss";

const MainConversion = (props) => {
  props.setPageTitle("conversion");

  const [checkboxState, setCheckboxState] = useState({
    exchanges: [],
    assets: [],
    payTypes: [],
  });
  const [settingsSum, setSettingsSum] = useState(undefined);
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
    } else if (settingsSum == 300000) {
      sum = "290000";
    } else {
      sum = settingsSum.slice(0, -4) + "0000";
    }

    console.log(sum);
    if (settingsSum === undefined || settingsSum === "") {
      getData("5000");
    } else {
      getData(sum);
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

  const urlGet = "../../php/getConverBundles-prod.php";
  // const urlGet = "http://p2p-backend:8080/getConverBundles.php";

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
          getData();
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
    getData();
    // setInterval(() => {
    //   getData();
    // }, 10000);
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
      />
      <Bundles logout={props.logout} bundlesData={newbundlesData} />
    </div>
  );
};

export default MainConversion;
