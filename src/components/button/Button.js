import React from "react";

function Button(props) {
  function handleClick() {
    props.pushBtn(props.operator);
  }

  const additionalClasses = () => {
    let classes = props.styleName;

    if (props.symbol === props.active) {
      classes = classes + " active";
    }
    return classes;
  };

  return (
    <div className={`button ${additionalClasses()}`} onClick={handleClick}>
      {props.symbol}
    </div>
  );
}
export default Button;
