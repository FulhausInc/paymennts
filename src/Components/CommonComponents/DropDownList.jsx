import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import InputBox from "./InputBox";
import Gap from "./Gap";

let DropDownList = (props) => {
  const [label, setLabel] = useState(props.label);
  const [showMenu, setShowMenu] = useState(false);
  const [hover, setHover] = useState(false);
  const [listItemName, setListItemName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [listItems, setListItems] = useState(props.listItems);

  useEffect(() => {
    if (props.resetLabelOnChange) {
      setLabel(props.label);
    }

    if (props.resetListItemsOnChange) {
      setListItems(props.listItems);
    }
  }, [props]);

  let hoverStyle = {
    background: props.listItemHoverBackground
      ? props.listItemHoverBackground
      : "#ff4b30",
    fontWeight: "bold",
    color: "#ffffff",
  };

  let style = {
    main: {
      position: "relative",
      textAlign: "right",
    },
    label: {
      background: props.labelBackground ? props.labelBackground : "transparent",
      border: props.labelBorder ? props.labelBorder : "none",
      color: props.labelColor ? props.labelColor : "#000000",
      boxShadow: props.labelBoxShadow,
      borderRadius: props.labelBorderRadius,
      width: props.labelWidth ? props.labelWidth : "100%",
      display: "flex",
      justifyContent: props.labelAlign ? props.labelAlign : "flex-end",
      alignItems: "center",
      height: props.labelHeight,
      padding: props.labelPadding,
      fontSize: props.labelFontSize,
    },
    listContainer: {
      position: "absolute",
      top: "1",
      right: props.listContainerFloat
        ? props.listContainerFloat === "left" && "0"
        : "0",
      left:
        props.listContainerFloat && props.listContainerFloat === "right" && "0",
      display: "flex",
      flexDirection: "column",
      background: props.listBackground ? props.listBackground : "#ffffff",
      padding: props.searchable ? " 0 calc(5px + 0.5vw)" : "calc(5px + 0.5vw)",
      minWidth: "100%",
      borderRadius: "10px",
      boxShadow: "0px 0px 20px rgba(23, 27, 58, 0.5)",
      overflow: "scroll",
      maxHeight: "50vh",
      zIndex: "2001",
      search: {
        paddingTop: "calc(5px + 0.5vw)",
        background: "#ffffff",
        width: "100%",
        position: "sticky",
        top: "0",
      },
    },
    listItem: {
      background: props.listItemBackground
        ? props.listItemBackground
        : "transparent",
      border: props.listItemBorder ? props.listItemBorder : "none",
      color: props.listItemColor ? props.listItemColor : "#000000",
      textAlign: props.listAlign ? props.listAlign : "right",
      padding: props.listPadding ? props.listPadding : "calc(8px + 1vw)",
      fontWeight: "bold",
      fontSize: props.listFontSize,
      width: props.listWidth,
      borderRadius: props.listItemBorderRadius
        ? props.listItemBorderRadius
        : "5px",
      margin: props.listMargin,
    },
  };

  const handleClicked = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.handleLabelClick && props.handleLabelClick(event);
    let _showMenu = showMenu;
    if (event.target.name && event.target.name !== "label") {
      props.onSelect && props.onSelect(event);
      props.resetLabel && setLabel(event.target.name);
    }
    setShowMenu(!_showMenu);
  };

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
    let newItemsList = props.listItems.filter((item) => {
      return item.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setListItems(newItemsList);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowMenu(false);
      }}
    >
      <div style={style.main}>
        <button
          style={style.label}
          name="label"
          onClick={(e) => handleClicked(e)}
        >
          <h5 style={{ margin: "0" }}>{label}</h5>
          {props.icon && (
            <img
              style={{
                marginLeft: "10px",
                filter: props.iconColorInvert ? "invert(1)" : "invert(0)",
              }}
              width={props.iconSize}
              src={props.icon}
              alt=""
            />
          )}
        </button>

        {showMenu && (listItems.length > 0 || searchValue !== "") && (
          <div style={style.listContainer}>
            {props.searchable && (
              <div style={style.listContainer.search}>
                <InputBox
                  name="SearchInput"
                  background=" #FFFFFF"
                  border="1px solid #B8C5D3"
                  borderRadius="5px"
                  width="100%"
                  // height="30px"
                  padding="calc(5px + 0.5vw)"
                  fontSize="calc(8px + 0.3vw)"
                  margin="0"
                  textAlign="left"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => handleSearchInput(e)}
                />
              </div>
            )}

            {props.searchable && <Gap value="calc(5px + 0.5vw)" />}

            {listItems.map((item, index) => {
              let hoverBackground =
                hover && item === listItemName && hoverStyle;
              return (
                <button
                  key={index}
                  style={{ ...style.listItem, ...hoverBackground }}
                  name={item}
                  onMouseEnter={() => {
                    setHover(true);
                    setListItemName(item);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                    setListItemName("");
                  }}
                  onClick={(e) => handleClicked(e)}
                >
                  {props.itemUpperCase ? item.toUpperCase() : item}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default DropDownList;
