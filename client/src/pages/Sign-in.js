//Landing Page for Boomerang Staff
import React from "react";
import { useState } from "react";
import Axios from "axios";

function SignIn() {
  //Keeps track of changes to name input box
  const [fname, setFname] = useState("");
  //Keeps track of changes to  last name input box
  const [lname, setLname] = useState("");
  //Keeps track of changes to email input box
  const [email, setEmail] = useState("");

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const signIn = () => {
    Axios.get("http://localhost:3000/insert", {
      fname: fname,
      lname: lname,
      email: email,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div className="App">
      <div className="information">
        {/*First name input box*/}
        <label>First Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setFname(event.target.value);
          }}
        />
        {/*Last name input box*/}
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setLname(event.target.value);
          }}
        />
        {/*Email input box*/}
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {/*Sign-in button that will fire the call to endpoint in the backend*/}
        <button onClick={signIn}>Sign-in</button>
      </div>
    </div>
  );
}

export default SignIn;
