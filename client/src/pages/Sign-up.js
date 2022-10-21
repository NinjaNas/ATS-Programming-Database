import React from "react";
import { useState } from "react";
import Axios from "axios";

function SignUp() {
  //Keeps track of changes to name input box
  const [first_name, setFirstName] = useState("");
  //Keeps track of changes to  last name input box
  const [last_name, setLastName] = useState("");
  //Keeps track of changes to email input box
  const [email, setEmail] = useState("");
  //Keeps track of changes to type input box
  const [type, setType] = useState("");
  //Keeps track of changes to password input box
  const [password, setPassword] = useState("");

  //Keeps track of if the type is student
  const [text, setText]  = useState("");

  const [date, setDate] = useState("");
  const [school_admin, setAdm] = useState("");
  const [social_worker, setWork] = useState("");
  const [school_counselor, setCoun] = useState("");
  const [pickup, setPickup] = useState("");

  //Adds new boxes to screen if type is student
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const signUp = () => {
    //If the type is student and text is invalid, creates session row.
    if (type == "student" && text == "") {
      setText(<>
        <br></br>
        <label>Start Date:</label>
        <input
            type="date"
            onChange={(event) => {
              setDate(event.target.value);
            } } 
          />
        <label>School Administrator:</label>
        <input
            type="text"
            onChange={(event) => {
              setAdm(event.target.value);
            } } 
        />
        <label>Social Worker:</label>
        <input
            type="text"
            onChange={(event) => {
              setWork(event.target.value);
            } } 
          />
        <label>School Counselor:</label>
        <input
            type="text"
            onChange={(event) => {
              setCoun(event.target.value);
            } } 
          />
        <label>Pickup:</label>
        <input
            type="text"
            onChange={(event) => {
              setPickup(event.target.value);
            } } 
          />
            </>);
    }
    else {
      Axios.post("http://localhost:3000/users/create", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      type: type,
      password_hash: password,
      intake_date: date,
      school_admin: school_admin,
      social_worker: social_worker,
      school_counselor: school_counselor,
      pickup: pickup
    }).then(() => {
      console.log("success");
    });
    }
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
          type="dropbox"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        {/*Password input box*/}
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {/*Sign-up button that will fire the call to endpoint in the backend*/}
        {text}
        <button onClick={signUp}>Add User</button>
      </div>
    </div>
  );
}

export default SignUp;
