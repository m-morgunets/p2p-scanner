import "./Settings.scss";

const SettingsListItem = (props) => {
  return (
    <li className="settings__list-item">
      <label>
        <input ref={props.itemsRef} name={props.name} onChange={props.onChangeFunc} type={props.type}
               value={props.value}/> <p>{props.title}</p>
      </label>
    </li>
  );
};

export default SettingsListItem;
