//Landing Page for Boomerang Staff
import React from "react";
import { useRef } from "react";
import Axios from "axios";
import LoginStyles from "../../styles/Login.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

function Login() {
  const emailRef = useRef();
  //Keeps track of changes to password input box
  const passwordRef = useRef();

  const router = useRouter();

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const login = () => {
    Axios.post("/api/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then((res) => {
        console.log("success");
        const role = res.data;
        router.push("/app/dashboard/" + role);
      })
      .catch((err) => {
        console.log(err);
        router.push("/app/login");
      });
  };

  return (
    <div className={LoginStyles.login}>
      <div className={LoginStyles.loginForm}>
        <Image src={"/smallLogo.png"} width={50} height={50} />
        <h2 className={LoginStyles.title}>Welcome to Boomerang</h2>
        <div className={LoginStyles.input_container}>
          {/*Email input box*/}
          <label className={LoginStyles.placeholder}>Email:</label>
          <input className={LoginStyles.input} type="email" ref={emailRef} />
          <br></br>
          {/*Type input box*/}
          <label label className={LoginStyles.placeholder}>
            Password:
          </label>
          <input
            className={LoginStyles.input}
            type="password"
            ref={passwordRef}
          />
          {/*Sign-in button that will fire the call to endpoint in the backend*/}
          <button className={LoginStyles.submit} onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
