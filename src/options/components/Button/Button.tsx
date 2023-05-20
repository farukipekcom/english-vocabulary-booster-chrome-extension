import React from "react";
import PlusIcon from "../../components/icons/plus";
import styles from "./Button.module.scss";
export interface Props {
  text?: string;
  icon?: boolean;
  onClick?: (e: any) => void;
}
function Button(Props: Props) {
  const {text, icon, onClick} = Props;
  return (
    <div className={styles.button} onClick={onClick}>
      {icon && (
        <div className={styles.buttonIcon}>
          <PlusIcon />
        </div>
      )}
      <div className={styles.buttonText}>{text}</div>
    </div>
  );
}

export default Button;
