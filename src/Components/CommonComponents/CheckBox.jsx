import React, { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import Gap from "./Gap";

const CheckBox = (props) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const style = {
    wrapper: {
      display: "flex",
      alignItems: "center",
    },
    checkBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: props.borderRadius,
      backgroundColor: checked ? props.backgroundColor : "transparent",
      border: props.checked
        ? "2px solid " + props.backgroundColor
        : props.border
        ? props.border
        : "2px solid #dce1eb",
      width: props.size,
      height: props.size,
      padding: "2px",
    },
    checkBoxIcon: {
      color: checked ? props.checkIconColor : "transparent",
    },
    label: {
      margin: "0",
      fontSize: props.labelFontSize,
      color: checked ? props.backgroundColor : props.labelColor,
      fontWeight: checked ? "bold" : "normal",
    },
  };

  const handleCheckBox = (event) => {
    const currentCheckValue = checked;
    if (props.disableUnCheck && currentCheckValue) {
      return;
    }
    setChecked(!currentCheckValue);
    props.onClick(!currentCheckValue);
  };

  return (
    <div style={style.wrapper}>
      {!props.cancelIcon && (
        <div style={style.checkBox} onClick={(e) => handleCheckBox(e)}>
          <FiCheck style={style.checkBoxIcon} />
        </div>
      )}
      {props.cancelIcon && (
        <div style={style.checkBox} onClick={(e) => handleCheckBox(e)}>
          <FiX style={style.checkBoxIcon} />
        </div>
      )}
      {props.label && <Gap value="5px" />}
      <p style={style.label}>{props.label}</p>
    </div>
  );
};

export default CheckBox;
