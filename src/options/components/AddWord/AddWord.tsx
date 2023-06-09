import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import "./AddWord.scss";
import React, {useState} from "react";
import CloseIcon from "../icons/close";
import {fetchPageWords, setModal, setTrigger} from "../../../stores/word";
import {useDispatch, useSelector} from "react-redux";
import {supabase} from "../../lib/helper/supabaseClient";
import {useLocation, useNavigate} from "react-router-dom";
function AddWord() {
  let location = useLocation();
  const navigate = useNavigate();
  const locationSearch = location.search.split("=")[1];
  const dispatch = useDispatch<any>();
  const {token, settingsResponse, trigger} = useSelector((state: any) => state.word);
  const [formValue, setformValue] = useState({
    word: location.search.length > 0 ? locationSearch : "",
    meaning: "",
    noun: "",
    verb: "",
    adverb: "",
    adjective: "",
    user_uuid: token.user.id,
  });
  const handleChangeInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const {data, error}: any = await supabase.from("words").insert(formValue);
    dispatch(setModal(false));
    dispatch(setTrigger(!trigger));
    dispatch(fetchPageWords({wordFrom: 0, wordTo: settingsResponse?.word_limit - 1}));
    navigate(location.pathname, {});
  };
  return (
    <div className="card">
      <div
        className="card-close"
        onClick={() => {
          dispatch(setModal(false));
          navigate(location.pathname, {});
        }}>
        <CloseIcon />
      </div>
      <div className="card-heading">
        <div className="card-heading-title">Add Word</div>
        <div className="card-heading-description">
          You can add words to the form below. If they are verbs or adjectives, please write them in separate boxes.
        </div>
      </div>
      <form className="form" onSubmit={handleAdd}>
        <div className="card-input">
          <div className="card-input-label">Keyword</div>
          <div className="card-input-item">
            <InputText name="word" id="word" value={formValue.word} onChange={handleChangeInput} placeholder="Keyword" />
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
          <Button text="Submit" />
        </div>
      </form>
    </div>
  );
}

export default AddWord;
