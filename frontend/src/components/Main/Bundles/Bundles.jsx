import "./Bundles.scss";
import BundlesItem from "./BundlesItem";

const Bundles = (props) => {
  let bundlesItems = null;
  if (props.bundlesData != undefined) {
    bundlesItems = props.bundlesData.map((p) => (
      <BundlesItem
        assetBuy={p.asset_buy}
        assetSell={p.asset_sell}
        liquidity={p.liquidity}
        payTypesBuy={p.payTypes_buyText}
        payTypesSell={p.payTypes_sellText}
        priceBuy={p.price_buy}
        priceSell={p.price_sell}
      />
    ));
  }

  return (
    <div className="bundles">
      <table className="bundles__table">
        <tr className="bundles__table-title">
          <th colspan={4}>Покупаем</th>
          <th colspan={5}>Продаем</th>
        </tr>
        <tr className="bundles__table-subtitle">
          <th>Биржа</th>
          <th>Актив</th>
          <th>Цена</th>
          <th>Платежка</th>
          <th>Биржа</th>
          <th>Актив</th>
          <th>Цена</th>
          <th>Платежка</th>
          <th>Спред</th>
        </tr>
        {bundlesItems}
      </table>
    </div>
  );
};

export default Bundles;
