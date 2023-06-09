import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import "./EditWord.scss";
import React, {useEffect, useState} from "react";
import CloseIcon from "../icons/close";
import {useDispatch, useSelector} from "react-redux";
import {setModal, setTrigger} from "../../../stores/word";
import {supabase} from "../../lib/helper/supabaseClient";

function EditWord() {
  const dispatch = useDispatch();
  const {trigger, wordId, token} = useSelector((state: any) => state.word);
  const [formValue, setformValue] = useState({
    word: "",
    meaning: "",
    noun: "",
    verb: "",
    adverb: "",
    adjective: "",
    user_uuid: token.user.id,
  });
  useEffect(() => {
    const fetchWord = async () => {
      const {data, error}: any = await supabase.from("words").select().eq("word_id", wordId);
      setformValue(data[0]);
    };
    fetchWord();
  }, []);
  const handleChangeInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const {data, error}: any = await supabase.from("words").update(formValue).eq("word_id", wordId).select();
    dispatch(setModal(false));
    dispatch(setTrigger(!trigger));
  };
  return (
    <div className="card">
      <div
        className="card-close"
        onClick={() => {
          dispatch(setModal(false));
        }}>
        <CloseIcon />
      </div>
      <div className="card-heading">
        <div className="card-heading-title">Edit Word</div>
        <div className="card-heading-description">
          You can update words to the form below. If they are verbs or adjectives, please write them in separate boxes.
        </div>
      </div>
      <form onSubmit={handleAdd} className="form">
        <div className="card-input">
          <div className="card-input-label">Keyword</div>
          <div className="card-input-item">
            <InputText name="word" value={formValue.word} onChange={handleChangeInput} placeholder="Keyword" />
          </div>
        </div>
        <div className="card-input">
          <div className="card-input-label">Meaning</div>
          <div className="card-input-item">
            <InputText name="meaning" value={formValue.meaning} onChange={handleChangeInput} placeholder="Meaning" />
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
          <Button text="Update" />
        </div>
      </form>
    </div>
  );
}

export default EditWord;
