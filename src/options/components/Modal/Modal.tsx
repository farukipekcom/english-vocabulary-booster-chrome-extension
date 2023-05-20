import React from "react";
import styles from "./Modal.module.scss";
import EditWord from "../EditWord/EditWord";
import AddWord from "../AddWord/AddWord";
import {useDispatch} from "react-redux";
import {setModal} from "../../../stores/word";
function Modal({isAddOrEdit}) {
  const dispatch = useDispatch();
  return (
    <div className={styles.modal}>
      <div
        className={styles.modalBackground}
        onClick={() => {
          dispatch(setModal(false));
        }}></div>
      {isAddOrEdit ? <EditWord /> : <AddWord />}
    </div>
  );
}

export default Modal;
