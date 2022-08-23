import "./Settings.scss";

const SettingsListItem = (props) => {
  return (
    <li className="settings__list-item">
      <label>
        <input ref={props.refItem} onChange={props.onChangeFunc} type="checkbox" value={props.value} id="" /> <p>{props.title}</p>
      </label>
    </li>
  );
};

export default SettingsListItem;
