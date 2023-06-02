import React from "react";
import {PlusIcon} from "../../components/icons";
import styles from "./Button.module.scss";
export interface Props {
  text: string;
  icon?: boolean;
  onClick?: (e: any) => void;
}
function Button(Props: Props) {
  const {text, icon, onClick} = Props;
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && (
        <div className={styles.buttonIcon}>
          <PlusIcon />
        </div>
      )}
      <div className={styles.buttonText}>{text}</div>
    </button>
  );
}

export default Button;
