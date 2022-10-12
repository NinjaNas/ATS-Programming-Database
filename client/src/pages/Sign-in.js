//Landing Page for Boomerang Staff
import React from "react";
import { useState } from "react";
import Axios from "axios";

function SignIn() {
  //Keeps track of changes to name input box
  const [first_name, setFirstName] = useState("");
  //Keeps track of changes to  last name input box
  const [last_name, setLastName] = useState("");
  //Keeps track of changes to email input box
  const [email, setEmail] = useState("");
  //Keeps track of changes to type input box
  const [type, setType] = useState("");

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const signIn = () => {
    Axios.post("http://localhost:3000/users/create", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      type: type,
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
            setFirstName(event.target.value);
          }}
        />
        {/*Last name input box*/}
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
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
        {/*Type input box*/}
        <label>Type:</label>
        <input
          type="text"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        {/*Sign-in button that will fire the call to endpoint in the backend*/}
        <button onClick={signIn}>Sign-in</button>
      </div>
    </div>
  );
}

export default SignIn;
