import React from "react";

const Line = (props) => {
  return (
    <div
      style={{
        minWidth: props.width,
        minHeight: props.height,
        background: props.color,
      }}
    ></div>
  );
};

export default Line;
