import React, { useState } from "react";

let Button = (props) => {
  const [clickEffect, setClickEffect] = useState(false);
  let style = {
    main: {
      display: "flex",
      textAlign: props.textAlign ? props.textAlign : "center",
      background: props.background ? props.background : "transparent",
      width: props.width,
      height: props.height,
      color: props.color,
      fontSize: props.fontSize ? props.fontSize : "18px",
      fontWeight: props.fontWeight ? props.fontWeight : "bold",
      border: props.border ? props.border : "none",
      borderRadius: props.borderRadius ? props.borderRadius : "50px",
      margin: props.margin,
      padding: props.padding,
      justifyContent: props.justifyContent ? props.justifyContent : "center",
      alignItems: props.alignItems ? props.alignItems : "center",
      opacity: (!props.enabled || clickEffect) && 0.5,
      cursor: props.enabled ? "pointer" : "not-allowed",
    },

    suffixIcon: {
      objectFit: props.suffixIconObjectFit
        ? props.suffixIconObjectFit
        : "cover",
      borderRadius: props.suffixIconBorderRadius
        ? props.suffixIconBorderRadius
        : "0",
      margin: props.suffixMargin,
    },

    prefixIcon: {
      objectFit: props.prefixIconObjectFit
        ? props.suffixIconObjectFit
        : "cover",
      borderRadius: props.prefixIconBorderRadius
        ? props.suffixIconBorderRadius
        : "0",
      margin: props.prefixMargin,
    },
  };

  const buttonClicked = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setClickEffect(true);
    props.enabled && props.onClick && props.onClick(event);
    setTimeout(() => {
      setClickEffect(false);
    }, 100);
  };

  return (
    <button
      id={props.id}
      name={props.name}
      style={style.main}
      onClick={buttonClicked}
    >
      {props.prefixIcon && (
        <img
          style={style.prefixIcon}
          width={props.prefixIconWidth}
          height={
            props.prefixIconHeight
              ? props.prefixIconHeight
              : props.prefixIconWidth
          }
          src={props.prefixIcon}
          alt=""
        />
      )}
      {props.label}
      {props.suffixIcon && (
        <img
          style={style.suffixIcon}
          width={props.suffixIconWidth}
          height={
            props.suffixIconHeight
              ? props.suffixIconHeight
              : props.suffixIconWidth
          }
          src={props.suffixIcon}
          alt=""
        />
      )}
    </button>
  );
};

export default Button;
