import "./Bundles.scss";

const BundlesItem = (props) => {
  return (
    <tr className="bundlesItem">
      <td>Binance</td>
      <td>{props.assetBuy}</td>
      <td>{Math.floor(props.priceBuy * 100) / 100}</td>
      <td>{props.payTypesBuy}</td>
      <td>Binance</td>
      <td>{props.assetSell}</td>
      <td>{Math.floor(props.priceSell * 100) / 100}</td>
      <td>{props.payTypesSell}</td>
      <td>{Math.floor(props.liquidity * 100) / 100} %</td>
    </tr>
  );
};

export default BundlesItem;
