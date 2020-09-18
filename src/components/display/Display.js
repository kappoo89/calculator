import React from "react";

function Display(props) {
  return (
    <div className="display">
      <div className="displayResult">{props.result}</div>
    </div>
  );
}

export default Display;
