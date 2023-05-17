import React from "react";
import "./Modal.scss";
import EditWord from "../EditWord/EditWord";
import AddWord from "../AddWord/AddWord";
import {useDispatch} from "react-redux";
import {setModal} from "../../../stores/word";
function Search({isAddOrEdit, isModalActive, setIsModalActive}) {
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <div
        className="modal-background"
        onClick={() => {
          dispatch(setModal(false));
          setIsModalActive(false);
        }}></div>
      {isAddOrEdit ? <EditWord isModalActive={isModalActive} setIsModalActive={setIsModalActive} /> : <AddWord />}
    </div>
  );
}

export default Search;
