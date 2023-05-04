import React from "react";
import "./InputText.scss";
function InputText({
  placeholder = "Add a new word",
  type = "text",
  name,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      className="input"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
}

export default InputText;
