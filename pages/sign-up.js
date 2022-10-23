import React from "react";
import { useState } from "react";
import Axios from "axios";

function SignUp() {
  //Keeps track of changes to name input box
  const [firstName, setFirstName] = useState("");
  //Keeps track of changes to  last name input box
  const [lastName, setLastName] = useState("");
  //Keeps track of changes to email input box
  const [email, setEmail] = useState("");
  //Keeps track of changes to type input box
  const [type, setType] = useState("");
  //Keeps track of changes to password input box
  const [password, setPassword] = useState("");

  //Keeps track of if the type is student
  const [text, setText] = useState("");

  const [date, setDate] = useState("");
  const [schoolAdmin, setAdmin] = useState("");
  const [socialWorker, setSocialWorker] = useState("");
  const [schoolCounselor, setSchoolCounselor] = useState("");
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
      setText(
        <>
          <br></br>
          <label>Start Date:</label>
          <input
            type="date"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
          <label>School Administrator:</label>
          <input
            type="text"
            onChange={(event) => {
              setAdmin(event.target.value);
            }}
          />
          <label>Social Worker:</label>
          <input
            type="text"
            onChange={(event) => {
              setSocialWorker(event.target.value);
            }}
          />
          <label>School Counselor:</label>
          <input
            type="text"
            onChange={(event) => {
              setSchoolCounselor(event.target.value);
            }}
          />
          <label>Pickup:</label>
          <input
            type="text"
            onChange={(event) => {
              setPickup(event.target.value);
            }}
          />
        </>
      );
    } else {
      Axios.post("http://localhost:3000/api/users/create", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        type: type,
        password: password,
        intake_date: date,
        school_admin: schoolAdmin,
        social_worker: socialWorker,
        school_counselor: schoolCounselor,
        pickup: pickup,
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
