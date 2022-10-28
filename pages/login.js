//Landing Page for Boomerang Staff
import React from "react";
import { useRef, useState } from "react";
import Axios from "axios";

function Login() {
  const emailRef = useRef();
  //Keeps track of changes to password input box
  const passwordRef = useRef();

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const login = () => {
    Axios.post("http://localhost:3000/api/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="information">
        {/*Email input box*/}
        <label>Email:</label>
        <input type="email" ref={emailRef} />
        {/*Type input box*/}
        <label>Password:</label>
        <input type="password" ref={passwordRef} />
        {/*Sign-in button that will fire the call to endpoint in the backend*/}
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
