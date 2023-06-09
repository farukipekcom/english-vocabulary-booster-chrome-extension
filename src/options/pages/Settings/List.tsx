import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Styles.module.scss";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import {fetchSettings} from "../../../stores/word";
import {supabase} from "../../lib/helper/supabaseClient";
import {MyToast} from "../../lib/toast";
function List() {
  const {token} = useSelector((state: any) => state.word);
  const dispatch = useDispatch<any>();
  const {settingsResponse, settingsSuccess} = useSelector((state: any) => state.word);
  const [formValue, setformValue] = useState({
    word_limit: Number(""),
  });
  useEffect(() => {
    dispatch(fetchSettings());
  }, []);
  useEffect(() => {
    settingsSuccess && setformValue({...formValue, word_limit: settingsResponse?.word_limit});
  }, [settingsSuccess]);
  const handleChangeInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: Number(event.target.value),
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const {data} = await supabase.from("settings").upsert({user_uuid: token.user.id, word_limit: formValue.word_limit}).select();
    dispatch(fetchSettings());
    data ? MyToast("updateSuccess") : MyToast("updateError");
  };
  const onChangeStatus = settingsResponse.word_limit !== formValue.word_limit ? true : null;
  return (
    <form className={styles.list} onSubmit={onChangeStatus && handleAdd}>
      <div className={styles.heading}>
        <div className={styles.title}>
          <div className={styles.title}>List</div>
          <div className={styles.description}>Update your list details here.</div>
        </div>
        <div className={`${onChangeStatus ? styles.buttonActive : styles.button}`}>
          <Button text="Save" />
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
    </form>
  );
}

export default List;
