import React from "react";
import { useRef } from "react";
import Axios from "axios";
import signUpStyles from "../../../../styles/Login.module.css";
import { useRouter } from "next/router";

function CreateUser() {
  //Keeps track of changes to name input box
  const firstNameRef = useRef();
  //Keeps track of changes to  last name input box
  const lastNameRef = useRef();
  //Keeps track of changes to email input box
  const emailRef = useRef();
  const pronounRef = useRef();
  const notesRef = useRef();
  //Keeps track of changes to type input box
  const typeRef = useRef();
  //Keeps track of changes to password input box
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const router = useRouter();

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const createUser = () => {
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return document.getElementById("password").removeAttribute("hidden");
    } else {
      document.getElementById("password").setAttribute("hidden", "");
    }
    Axios.post("/api/user/create", {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      pronouns: pronounRef.current.value,
      created_at: new Date().toISOString().split("T")[0],
      type: typeRef.current.value,
      notes: notesRef.current.value,
      password: passwordRef.current.value,
    })
      .then((response) => {
        console.log("success");
        if (typeRef.current.value == "student") {
          router.push({
            pathname: "/app/dashboard/admin/createdemographics/[id]",
            query: { id: response.data.id },
          });
        } else {
          router.push("/app/user");
        }
      })
      .catch((err) => {
        console.log(err);
        return document.getElementById("values").removeAttribute("hidden");
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
            ref={firstNameRef}
            required
          />
          <br></br>
          {/*Last name input box*/}
          <label className={signUpStyles.placeholder}>Last Name:</label>
          <input
            className={signUpStyles.input}
            type="text"
            ref={lastNameRef}
            required
          />
          <br></br>
          {/*Email input box*/}
          <label className={signUpStyles.placeholder}>Email:</label>
          <input
            className={signUpStyles.input}
            type="text"
            ref={emailRef}
            required
          />
          <br></br>
          <label className={signUpStyles.placeholder}>Pronouns:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={pronounRef}
            required
          >
            <option value=""> -- select an option -- </option>
            <option value="1">He/Him</option>
            <option value="2">She/Her</option>
            <option value="3">They/Them</option>
          </select>
          <br></br>
          <label className={signUpStyles.placeholder}>Notes:</label>
          <input className={signUpStyles.input} type="text" ref={notesRef} />
          <br></br>
          {/*Type input box*/}
          <label className={signUpStyles.placeholder}>Type:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={typeRef}
            required
          >
            <option value=""> -- select an option -- </option>
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
            ref={passwordRef}
            required
          />
          <br></br>
          <label className={signUpStyles.placeholder}>Confirm Password:</label>
          <input
            className={signUpStyles.input}
            type="password"
            ref={confirmPasswordRef}
            required
          />
          <br></br>

          <label className={signUpStyles.warning} id="password" hidden>
            Mismatching passwords!
          </label>
          <label className={signUpStyles.warning} id="values" hidden>
            Missing values or email exists!
          </label>

          {/*Sign-up button that will fire the call to endpoint in the backend*/}
          <button className={signUpStyles.submit} onClick={createUser}>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
