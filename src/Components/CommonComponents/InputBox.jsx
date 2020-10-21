import React, { useState } from "react";

let InputBox = (props) => {
  const [error, setError] = useState(false);

  let errorColor = props.validationErrorColor
    ? props.validationErrorColor
    : "#EA4B5F";
  let errorBorder = "1.5px solid " + errorColor;

  let style = {
    main: {
      margin: props.margin ? props.margin : "10px 0",
      width: "100%",
      padding: 0,
      border: "none",
    },

    input: {
      width: props.width ? props.width : "100%",
      height: props.rows ? null : props.height ? props.height : "50px",
      padding: props.padding ? props.padding : "10px 20px",
      color: props.color ? props.color : "#0f0f0f",
      border: error
        ? errorBorder
        : props.value
        ? props.activeBorder
          ? props.activeBorder
          : props.border
          ? props.border
          : "none"
        : "none",

      borderRadius: props.borderRadius ? props.borderRadius : "5px",
      fontSize: props.fontSize ? props.fontSize : "18px",
      background: props.background ? props.background : "#F7F7F7",
      textAlign: props.textAlign,
    },
    error: {
      textAlign: "left",
      margin: 0,
      padding: 0,
      fontSize: props.fontSize ? "calc(" + props.fontSize + " - 4px)" : "14px",
      color: props.validationErrorColor
        ? props.validationErrorColor
        : "#EA4B5F",
    },
  };

  let handleEnteredInput = (event) => {
    event.stopPropagation();
    props.onChange(event);
    setError(false);
  };

  let handleOnBlur = (event) => {
    props.onBlur && props.onBlur(event);
    let isValidInput = true;
    if (props.validation !== undefined) {
      isValidInput = props.validation;
    }
    setError(!isValidInput);
  };

  return props.rows || props.cols ? (
    <fieldset style={style.main}>
      <textarea
        style={style.input}
        defaultValue={props.defaultValue}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        onChange={handleEnteredInput}
        onBlur={handleOnBlur}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus && props.autoFocus ? props.autoFocus : null}
        readOnly={props.readOnly && props.readOnly ? props.readOnly : null}
        rows={props.rows}
        cols={props.cols}
      />
      {error && (
        <p style={style.error}>
          {props.validationErrorMessage
            ? props.validationErrorMessage
            : "error in input..."}
        </p>
      )}
    </fieldset>
  ) : (
    <fieldset style={style.main}>
      <input
        style={style.input}
        defaultValue={props.defaultValue}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        onChange={handleEnteredInput}
        onBlur={handleOnBlur}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus && props.autoFocus ? props.autoFocus : null}
        readOnly={props.readOnly && props.readOnly ? props.readOnly : null}
      />
      {error && (
        <p style={style.error}>
          {props.validationErrorMessage
            ? props.validationErrorMessage
            : "error in input..."}
        </p>
      )}
    </fieldset>
  );
};

export default InputBox;
