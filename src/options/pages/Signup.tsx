import React, {useState} from "react";
import styles from "./Login.module.scss";
import InputText from "../components/InputText/InputText";
import Button from "../components/Button/Button";
import {supabase} from "../lib/helper/supabaseClient";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setToken} from "../../stores/word";
export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValue, setformValue] = useState({
    first_name: "",
    email_address: "",
    password: "",
  });
  const handleChangeInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const signUp = async (e) => {
    e.preventDefault();
    const {data, error} = await supabase.auth.signUp({
      email: formValue.email_address,
      password: formValue.password,
    });
    const res: any =
      data &&
      (await supabase
        .from("user")
        .insert({first_name: formValue.first_name, email_address: formValue.email_address, user_uuid: data.user.id}));
    data && res && navigate("../home");
    dispatch(setToken(data.session));
  };
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <form className={styles.form} onSubmit={signUp}>
          <div className={styles.heading}>
            <div className={styles.title}>Sign up</div>
            <div className={styles.description}>Start improving your English.</div>
          </div>
          <div className={styles.inputList}>
            <div>
              <span>Name*</span>
              <InputText name="first_name" placeholder="Enter your name" onChange={handleChangeInput} />
            </div>
            <div>
              <span>Email*</span>
              <InputText name="email_address" placeholder="Enter your email" onChange={handleChangeInput} />
            </div>
            <div>
              <span>Password*</span>
              <InputText name="password" type="password" placeholder="Create a password" onChange={handleChangeInput} />
            </div>
          </div>
          <div className={styles.button}>
            <Button text="Get started" />
          </div>
          <div className={styles.signup}>
            Do you have an account? <a href="#/login">Login</a>
          </div>
        </form>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
