import React from "react";
import { useTranslation } from "react-i18next";

function SelectBoxCustom(props) {
  const { t, i18n } = useTranslation();

  const [items, setItems] = React.useState(props.items || []);
  const [showItems, setShowItems] = React.useState(false);
  //   const [selectedItem, setSelectedItem] = React.useState(
  //     localStorage.getItem("language") != null
  //       ? localStorage.getItem("language") === "sr"
  //         ? props.items[1]
  //         : props.items[0]
  //       : props.items && props.items[0]
  //   );
  const [selectedItem, setSelectedItem] = React.useState(() => {
    const storedLang = localStorage.getItem("language");
    return storedLang
      ? items.find((item) => item.lang === storedLang) || items[0]
      : items[0];
  });

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setShowItems(false);
    // window.location.reload();
    localStorage.setItem("language", item.lang);
    i18n.changeLanguage(item.lang);
  };

  return (
    <div className="select-box--box">
      <div className="select-box--container">
        <div className="select-box--selected-item" onClick={dropDown}>
          {selectedItem.value} <img src={selectedItem.icon} />
        </div>
        <div
          style={{ display: showItems ? "block" : "none" }}
          className={"select-box--items"}
        >
          <div className="drop">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => selectItem(item)}
                className={selectedItem === item ? "selected" : ""}
              >
                {item.value} <img src={item.icon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectBoxCustom;
