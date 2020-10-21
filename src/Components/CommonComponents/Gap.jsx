import React from "react";

const Gap = (props) => {
  return (
    <div
      style={{
        minWidth: props.value,
        minHeight: props.value,
      }}
    ></div>
  );
};

export default Gap;
