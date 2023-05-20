import React from "react";
import styles from "./PageTitle.module.scss";
import Button from "../Button/Button";
export interface Props {
  title: string;
  description?: string;
  onClick?: () => void;
  buttonText?: string;
  buttonIcon?: boolean;
}
export default function PageTitle(Props: Props) {
  const {title, description, onClick, buttonText} = Props;
  return (
    <div className={styles.heading}>
      <div className={styles.headingLeft}>
        <div className={styles.headingLeftTitle}>{title}</div>
        <div className={styles.headingLeftDescription}>{description}</div>
      </div>
      <div className={styles.headingRight}>{onClick && <Button text={buttonText} icon={true} onClick={onClick} />}</div>
    </div>
  );
}
