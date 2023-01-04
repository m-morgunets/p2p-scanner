import "./Exchangedata.scss";

const ExchangedataLine = (props) => {
  let lines = null;
  if (props.data != undefined && props.data.length != 0) {
    lines = props.order.map((asset) => (
      <td>{props.data[asset] == 0 ? "-" : props.data[asset]}</td>
    ));
  }
  return (
    <tr className="exchangedata__table-line">
      <td className="pay-types">{props.data.payTypes}</td>
      {lines}
    </tr>
  );
};

export default ExchangedataLine;
