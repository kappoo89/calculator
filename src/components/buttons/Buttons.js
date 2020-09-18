import React from "react";
import Button from "../button/Button";

function Buttons(props) {
  const buttons = props.schema.map((elem, i) => {
    return (
      <Button
        key={i}
        symbol={elem.symbol}
        operator={elem.operator}
        styleName={elem.styleName}
        pushBtn={props.pushBtn}
        active={props.active}
      />
    );
  });
  return <div className="buttons">{buttons}</div>;
}

export default Buttons;
