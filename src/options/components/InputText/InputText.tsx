import React from "react";
import styles from "./InputText.module.scss";
export interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: any;
  onChange?: (e: any) => void;
}
function InputText(Props: Props) {
  const {className, type, placeholder, name, value, onChange} = Props;
  return (
    <input className={`${styles.input} ${className}`} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
  );
}
export default InputText;
