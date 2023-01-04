import "./Settings.scss";
import SettingsListItem from "./SettingsListItem";

const SettingsList = (props) => {
  let settingsItems;
  if (props.itemsRef != undefined) {
    settingsItems = props.data.map((p, i) => (
      <SettingsListItem
        onChangeFunc={props.onChangeFunc}
        value={p.value}
        title={p.title}
        name={props.name}
        type={props.type}
        itemsRef={(el) => (props.itemsRef[i] = el)}
      />
    ));
  } else {
    settingsItems = props.data.map((p, i) => (
      <SettingsListItem
        onChangeFunc={props.onChangeFunc}
        value={p.value}
        title={p.title}
        name={props.name}
        type={props.type}
      />
    ));
  }
  // let settingsItems = [];

  // for (let i = 0; i < props.data.title.length; i++) {
  //   settingsItems.push(<SettingsListItem onChangeFunc={props.onChangeFunc} value={props.data.value[i]} title={props.data.title[i]}/>)
  // }

  return <ul className="settings__list">{settingsItems}</ul>;
};

export default SettingsList;
