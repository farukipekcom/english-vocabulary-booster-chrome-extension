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
    email_address: "",
    password: "",
  });
  const handleChangeInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const signIn = async (e) => {
    e.preventDefault();
    const {data, error} = await supabase.auth.signInWithPassword({
      email: formValue.email_address,
      password: formValue.password,
    });
    navigate("../home");
    dispatch(setToken(data.session));
  };
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <form className={styles.form} onSubmit={signIn}>
          <div className={styles.heading}>
            <div className={styles.title}>Log in</div>
            <div className={styles.description}>Welcome back! Please enter your email and password.</div>
          </div>
          <div className={styles.inputList}>
            <div>
              <span>Email</span>
              <InputText name="email_address" placeholder="Enter your email" onChange={handleChangeInput} />
            </div>
            <div>
              <span>Password</span>
              <InputText name="password" type="password" placeholder="••••••••" onChange={handleChangeInput} />
            </div>
          </div>
          <div className={styles.button}>
            <Button text="Sign in" />
          </div>
          <div className={styles.forgot}>Forgot password</div>
          <div className={styles.signup}>
            Don't have an account? <a href="#/signup">Sign up</a>
          </div>
        </form>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
