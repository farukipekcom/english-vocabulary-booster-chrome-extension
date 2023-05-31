import React from "react";
import styles from "./Modal.module.scss";
import EditWord from "../EditWord/EditWord";
import AddWord from "../AddWord/AddWord";
import {useDispatch} from "react-redux";
import {setModal} from "../../../stores/word";
import {useNavigate} from "react-router-dom";
function Modal({isAddOrEdit}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.modal}>
      <div
        className={styles.modalBackground}
        onClick={() => {
          dispatch(setModal(false));
          navigate("./", {});
        }}></div>
      {isAddOrEdit ? <EditWord /> : <AddWord />}
    </div>
  );
}

export default Modal;
