import React from "react";
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
  const signin = async () => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: process.env.REACT_APP_SUPABASE_EMAIL,
      password: process.env.REACT_APP_SUPABASE_PASSWORD,
    });
    navigate("../home");
    dispatch(setToken(data.session));
    localStorage.setItem("token", JSON.stringify(data.session));
  };
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.form}>
          <div className={styles.heading}>
            <div className={styles.title}>Log in</div>
            <div className={styles.description}>Welcome back! Please enter your details.</div>
          </div>
          <div className={styles.inputList}>
            <div className={styles.email}>
              <span>Email</span>
              <InputText name="email" placeholder="Enter your email" />
            </div>
            <div className={styles.password}>
              <span>Password</span>
              <InputText name="password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className={styles.button} onClick={signin}>
            <Button text="Sign in" />
          </div>
          <div className={styles.forgot}>Forgot password</div>
          <div className={styles.signup}>
            Don't have an account? <span>Sign up</span>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
