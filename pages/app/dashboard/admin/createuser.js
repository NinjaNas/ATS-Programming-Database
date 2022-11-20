import React from "react";
import { useState, useRef } from "react";
import Axios from "axios";
import signUpStyles from "../../../../styles/Login.module.css";
import { useRouter } from "next/router";

function SignUp() {
  //Keeps track of changes to name input box
  const [firstName, setFirstName] = useState("");
  //Keeps track of changes to  last name input box
  const [lastName, setLastName] = useState("");
  //Keeps track of changes to email input box
  const [email, setEmail] = useState("");
  const pronounRef = useRef();
  const [notes, setNotes] = useState("");
  //Keeps track of changes to type input box
  const typeRef = useRef();
  //Keeps track of changes to password input box
  const [password, setPassword] = useState("");

  const router = useRouter();

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
    Axios.post("http://localhost:3000/api/user/create", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      pronouns: pronounRef.current.value,
      created_at: new Date().toISOString().split("T")[0],
      type: typeRef.current.value,
      notes: notes,
      password: password,
    })
      .then(() => {
        console.log("success");
        router.push("/app/dashboard/admin/allstudents");
      })
      .catch((err) => {
        console.log(err);
      });
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
          <label className={signUpStyles.placeholder}>Pronouns:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={pronounRef}
          >
            <option value="1">He/Him</option>
            <option value="2">She/Her</option>
            <option value="3">They/Them</option>
          </select>
          <br></br>
          <label className={signUpStyles.placeholder}>Notes:</label>
          <input
            className={signUpStyles.input}
            type="text"
            onChange={(event) => {
              setNotes(event.target.value);
            }}
          />
          <br></br>
          {/*Type input box*/}
          <label className={signUpStyles.placeholder}>Type:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={typeRef}
          >
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="counselor">Counselor</option>
            <option value="admin">Admin</option>
          </select>
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
          <button className={signUpStyles.submit} onClick={signUp}>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
