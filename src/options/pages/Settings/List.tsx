import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Styles.module.scss";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import {fetchSettings} from "../../../stores/word";
import {supabase} from "../../lib/helper/supabaseClient";
function List() {
  const {token} = useSelector((state: any) => state.word);
  const dispatch = useDispatch<any>();
  const {settingsResponse} = useSelector((state: any) => state.word);
  useEffect(() => {
    dispatch(fetchSettings());
  }, []);
  const [formValue, setformValue] = useState({
    word_limit: settingsResponse?.word_limit,
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
    loginFormData.append("keyword", formValue.word_limit);
    const {data, error}: any = await supabase
      .from("settings")
      .update({word_limit: formValue.word_limit})
      .eq("user_id", token.user.id)
      .select();
    dispatch(fetchSettings());
  };

  return (
    <div className={styles.list}>
      <div className={styles.heading}>
        <div className={styles.title}>
          <div className={styles.title}>List</div>
          <div className={styles.description}>Update your list details here.</div>
        </div>
        <div className={styles.button}>
          <div className={styles.buttonCancel}>
            <Button text="Cancel" />
          </div>
          <div className={styles.buttonSave} onClick={handleAdd}>
            <Button text="Save" />
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.settingName}>Table word count</div>
        <div className={styles.setting}>
          <InputText
            placeholder="Enter a number"
            type="text"
            name="word_limit"
            value={formValue.word_limit !== undefined ? formValue.word_limit : settingsResponse?.word_limit || ""}
            onChange={handleChangeInput}
          />
        </div>
      </div>
    </div>
  );
}

export default List;
