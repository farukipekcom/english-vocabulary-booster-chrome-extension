import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import "./AddWord.scss";
import React, {useState} from "react";
import CloseIcon from "../icons/close";
import {setModal, setTrigger} from "../../../stores/word";
import {useDispatch, useSelector} from "react-redux";
function AddWord() {
  const dispatch = useDispatch();
  const trigger = useSelector((state: any) => state.word.triggers);
  const [formValue, setformValue] = useState({
    keyword: "",
    replace: "",
    noun: "",
    verb: "",
    adverb: "",
    adjective: "",
    added_date: new Date().valueOf(),
  });
  const handleChangeInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append("keyword", formValue.keyword);
    loginFormData.append("replace", formValue.replace);
    loginFormData.append("noun", formValue.noun);
    loginFormData.append("verb", formValue.verb);
    loginFormData.append("adverb", formValue.adverb);
    loginFormData.append("adjective", formValue.adjective);
    try {
      const response = await fetch(process.env.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });
      const result = await response.json();
      // console.log("Success:", result);
      dispatch(setModal(false));
      dispatch(setTrigger(!trigger));
    } catch (error) {
      // console.error("Error:", error);
    }
  };
  return (
    <div className="card">
      <div className="card-close" onClick={() => dispatch(setModal(false))}>
        <CloseIcon />
      </div>
      <div className="card-heading">
        <div className="card-heading-title">Add Word</div>
        <div className="card-heading-description">
          You can add words to the form below. If they are verbs or adjectives, please write them in separate boxes.
        </div>
      </div>
      <div className="form">
        <div className="card-input">
          <div className="card-input-label">Keyword</div>
          <div className="card-input-item">
            <InputText name="keyword" value={formValue.keyword} onChange={handleChangeInput} placeholder="Keyword" />
          </div>
        </div>
        <div className="card-input">
          <div className="card-input-label">Meaning</div>
          <div className="card-input-item">
            <InputText name="replace" value={formValue.replace} onChange={handleChangeInput} placeholder="Meaning" />
          </div>
        </div>
        <div className="card-input">
          <div className="card-input-label">Verb</div>
          <div className="card-input-item">
            <InputText name="verb" value={formValue.verb} onChange={handleChangeInput} placeholder="Verb" />
          </div>
        </div>
        <div className="card-input">
          <div className="card-input-label">Noun</div>
          <div className="card-input-item">
            <InputText name="noun" value={formValue.noun} onChange={handleChangeInput} placeholder="Noun" />
          </div>
        </div>
        <div className="card-input">
          <div className="card-input-label">Adjective</div>
          <div className="card-input-item">
            <InputText name="adjective" value={formValue.adjective} onChange={handleChangeInput} placeholder="Adjective" />
          </div>
        </div>
        <div className="card-input">
          <div className="card-input-label">Adverb</div>
          <div className="card-input-item">
            <InputText name="adverb" value={formValue.adverb} onChange={handleChangeInput} placeholder="Adverb" />
          </div>
        </div>
        <div className="card-input card-full">
          <Button text="Submit" onClick={handleAdd} />
        </div>
      </div>
    </div>
  );
}

export default AddWord;
