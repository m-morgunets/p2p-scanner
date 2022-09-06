import "./Bundles.scss";

const BundlesItem = (props) => {
  return (
    <tr className="bundles__table-item">
      <td>{props.exchangeBuy}</td>
      <td>{props.assetBuy}</td>
      <td>{Math.floor(props.priceBuy * 100000) / 100000}</td>
      <td>{props.payTypesBuy}</td>
      <td>{props.exchangeSell}</td>
      <td>{props.assetSell}</td>
      <td>{Math.floor(props.priceSell * 100000) / 100000}</td>
      <td>{props.payTypesSell}</td>
      <td>{Math.floor(props.liquidity * 100) / 100} %</td>
    </tr>
  );
};

export default BundlesItem;
