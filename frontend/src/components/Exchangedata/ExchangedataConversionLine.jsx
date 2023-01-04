import "./Exchangedata.scss";

const ExchangedataConversionLine = (props) => {
  return (
    <tr className="exchangedata__table-line">
      <td><p>{props.data.asset_1}</p>{"-->"}<p>{props.data.asset_2}</p></td>
      {/* <td>{"-->"}</td>
      <td>{props.data.asset_2}</td> */}
      <td>{props.data.price}</td>
    </tr>
  );
};

export default ExchangedataConversionLine;
