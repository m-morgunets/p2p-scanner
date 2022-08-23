import "./Settings.scss";
import SettingsListItem from "./SettingsListItem";

const SettingsList = (props) => {
  const settingsItems = props.data.map((p) => (
    <SettingsListItem
      onChangeFunc={props.onChangeFunc}
      value={p.value}
      title={p.title}
    />
  ));
  // let settingsItems = [];

  // for (let i = 0; i < props.data.title.length; i++) {
  //   settingsItems.push(<SettingsListItem onChangeFunc={props.onChangeFunc} value={props.data.value[i]} title={props.data.title[i]}/>)
  // }

  return <ul className="settings__list">{settingsItems}</ul>;
};

export default SettingsList;
