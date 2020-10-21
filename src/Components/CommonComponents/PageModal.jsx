import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const PageModal = (props) => {
  const [show, setShow] = useState(props.visible);

  const handleCloseModal = (event) => {
    event.preventDefault();
    if (event.target.closest(".modal") === null) {
      props.onClose(event);
    }
  };

  const style = {
    main: {
      display: props.visible ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(37, 43, 72, 0.6)",
      position: "fixed",
      minHeight: "100vh",
      width: "100vw",
      left: "0",
      top: "0",
      zIndex: "10000",
    },
    modal: {
      position: "relative",
      background: props.modalBackground ? props.modalBackground : "#ffffff",
      minWidth: !props.component && "50%",
      maxHeight: "90vh",
      padding: "calc(10px + 1vw)",
      borderRadius: "20px",
      overflow: "scroll",
      zIndex: "92",
    },
  };
  return (
    <div
      style={style.main}
      visible={props.visible.toString() && show.toString()}
    >
      <OutsideClickHandler
        onOutsideClick={(e) => {
          setShow(false);
          handleCloseModal(e);
        }}
      >
        <div id="cc-m" style={style.modal}>
          {props.component}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default PageModal;
