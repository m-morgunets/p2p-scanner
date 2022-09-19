import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Exchangedata.scss";
import ExchangedataLine from "./ExchangedataLine";

const Exchangedata = (props) => {
  const [exchangeData, setExchangeData] = useState({
    binance: [],
    huobi: [],
    bizlato: [],
    currenciesdata: [],
  });

  const [linesTable, setLinesTable] = useState({
    binance: "",
    huobi: "",
    bizlato: "",
    currenciesdata: "",
  });

  let orderAsset = {
    binance: ["USDT", "BTC", "BUSD", "BNB", "ETH", "RUB", "SHIB"],
    huobi: ["BTC", "USDT", "ETH", "HT", "EOS", "XRP", "LTC"],
    bizlato: ["BTC", "ETH", "BCH", "LTC", "DASH", "DOGE", "USDT", "USDC"],
  };

  let titleTable = {
    binance: "",
    huobi: "",
    bizlato: "",
  };
  let exchange = ["binance", "huobi", "bizlato"];

  titleTable.binance = orderAsset.binance.map((asset) => <th>{asset}</th>);
  titleTable.huobi = orderAsset.huobi.map((asset) => <th>{asset}</th>);
  titleTable.bizlato = orderAsset.bizlato.map((asset) => <th>{asset}</th>);

  // const urlGet = "http://p2p-backend:8080/getExchangedata.php";
  const urlGet = "../../php/getExchangedata-prod.php";

  const getData = async (exchange) => {
    try {
      const optionsData = new FormData();
      optionsData.set("exchange", exchange);
      const response = await axios.post(urlGet, optionsData);
      if (response.data.length === 0) {
        setTimeout(() => {
          getData(exchange);
        }, 1000);
      } else {
        let responseResult = response.data.map((e) => {
          e.payTypes = props.payTypesData[e.payTypes];
          return e;
        });
        let data = linesTable;
        data[exchange] = responseResult.map((key) => (
          <ExchangedataLine data={key} order={orderAsset[exchange]} />
        ));
        setLinesTable(data);
        setLinesTable({ ...linesTable });

        // setData(response.data);
        console.log("Update data!");
      }
    } catch (error) {
      console.error("Ошибка в запросе!");
      console.error(error);
    }
  };

  useEffect(() => {
    getData("binance");
    getData("bizlato");
    getData("huobi");
    getData("currenciesdata");
    // console.log(linesTable);
    let timer = setInterval(() => {
      getData("binance");
      getData("bizlato");
      getData("huobi");
      getData("currenciesdata");
      // console.log(linesTable);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="exchangedata"
      style={{ backgroundImage: `url("./assets/bg.jpg")` }}
    >
      <Header user={props.user} />
      <div className="container">
        <div className="exchangedata-box">
          {/* <div className="exchangedata__title"></div> */}
          <table className="exchangedata__table">
            <tr className="exchangedata__table-title">
              <th className="exchangedata__title">Binance</th>
              {titleTable.binance}
            </tr>
            {linesTable.binance}
          </table>
        </div>

        <div className="exchangedata-box">
          {/* <div className="exchangedata__title"></div> */}
          <table className="exchangedata__table">
            <tr className="exchangedata__table-title">
              <th className="exchangedata__title">Huobi</th>
              {titleTable.huobi}
            </tr>
            {linesTable.huobi}
          </table>
        </div>

        <div className="exchangedata-box">
          {/* <div className="exchangedata__title"></div> */}
          <table className="exchangedata__table">
            <tr className="exchangedata__table-title">
              <th className="exchangedata__title">Bizlato</th>
              {titleTable.bizlato}
            </tr>
            {linesTable.bizlato}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exchangedata;
