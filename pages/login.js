//Landing Page for Boomerang Staff
import React from "react";
import { useState } from "react";
import Axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  //Keeps track of changes to password input box
  const [password, setPassword] = useState("");

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const login = () => {
    Axios.post("http://localhost:3000/api/login", {
      email: email,
      password: password,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div className="App">
      <div className="information">
        {/*Email input box*/}
        <label>Email:</label>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {/*Type input box*/}
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {/*Sign-in button that will fire the call to endpoint in the backend*/}
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
