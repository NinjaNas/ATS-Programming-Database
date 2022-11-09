import React from "react";
import { useState } from "react";
import Axios from "axios";
import signUpStyles from "../../styles/Login.module.css";

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
          <br></br>
          <label>School Administrator:</label>
          <input
            type="text"
            onChange={(event) => {
              setAdmin(event.target.value);
            }}
          />
          <br></br>
          <label>Social Worker:</label>
          <input
            type="text"
            onChange={(event) => {
              setSocialWorker(event.target.value);
            }}
          />
          <br></br>
          <label>School Counselor:</label>
          <input
            type="text"
            onChange={(event) => {
              setSchoolCounselor(event.target.value);
            }}
          />
          <br></br>
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
      Axios.post("http://localhost:3000/api/user/create", {
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
      })
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={signUpStyles.login}>
      <div className={signUpStyles.form}>
        <div className={signUpStyles.input_container}>
          {/*First name input box*/}
          <label className={signUpStyles.placeholder}>First Name:</label>
          <input
            className={signUpStyles.input}
            type="text"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <br></br>
          {/*Last name input box*/}
          <label className={signUpStyles.placeholder}>Last Name:</label>
          <input
            className={signUpStyles.input}
            type="text"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <br></br>
          {/*Email input box*/}
          <label className={signUpStyles.placeholder}>Email:</label>
          <input
            className={signUpStyles.input}
            type="text"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br></br>
          {/*Type input box*/}
          <label className={signUpStyles.placeholder}>Type:</label>
          <input
            className={signUpStyles.input}
            type="dropbox"
            onChange={(event) => {
              setType(event.target.value);
            }}
          />
          <br></br>
          {/*Password input box*/}
          <label className={signUpStyles.placeholder}>Password:</label>
          <input
            className={signUpStyles.input}
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br></br>
          {/*Sign-up button that will fire the call to endpoint in the backend*/}
          {text}
          <button className={signUpStyles.submit} onClick={signUp}>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
