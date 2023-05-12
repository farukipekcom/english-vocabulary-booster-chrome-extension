import React from "react";
import PlusIcon from "../../components/icons/plus";
import "./button.scss";
function Button({text = "Button", icon = false}) {
  return (
    <div className="button">
      {icon && (
        <div className="button-icon">
          <PlusIcon />
        </div>
      )}
      <div className="button-text">{text}</div>
    </div>
  );
}

export default Button;
