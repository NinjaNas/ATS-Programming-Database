import React from "react";
import { useState, useRef } from "react";
import Axios from "axios";
import signUpStyles from "../../../../../styles/Login.module.css";
import { useRouter } from "next/router";

function CreateDemographics() {
  // Keeps track of changes for date of birth
  const dobRef = useRef();
  // Keeps track of changes for gender
  const genderRef = useRef();
  // Keeps track of changes for gender describe
  const genderDescribeRef = useRef();
  // Keeps track of changes for race
  const race_blRef = useRef();
  const race_aiRef = useRef();
  const race_asRef = useRef();
  const race_nhpiRef = useRef();
  const race_whRef = useRef();
  const race_otherRef = useRef();
  const race_other_specifyRef = useRef();
  // Keeps track of changes for ethnicity
  const ethnicityRef = useRef();
  // Keeps track of changes for free lunch
  const freeLunchRef = useRef();

  const router = useRouter();
  const { id } = router.query;

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const createDemographics = () => {
    Axios.post("/api/demographics/create", {
      id: id,
      date_of_birth: dobRef.current.value,
      gender: genderRef.current.value,
      gender_other: genderDescribeRef.current.value,
      race_bl: race_blRef.current.checked,
      race_ai: race_aiRef.current.checked,
      race_as: race_asRef.current.checked,
      race_nhpi: race_nhpiRef.current.checked,
      race_wh: race_whRef.current.checked,
      race_other: race_otherRef.current.checked,
      race_other_specify: race_other_specifyRef.current.value,
      ethnicity: ethnicityRef.current.value,
      free_lunch: freeLunchRef.current.value,
    })
      .then(() => {
        console.log("success");
        router.push(`/app/dashboard/admin/studentprofile/${id}`);
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("values").removeAttribute("hidden");
      });
  };

  return (
    <div className={signUpStyles.login}>
      <div className={signUpStyles.form}>
        <div className={signUpStyles.input_container}>
          <label className={signUpStyles.placeholder}>Date of Birth:</label>
          <input
            className={signUpStyles.input}
            type="date"
            ref={dobRef}
            required
          />
          <br></br>
          <label className={signUpStyles.placeholder}>Gender:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={genderRef}
            required
          >
            <option value=""> -- select an option -- </option>
            <option value="1">Female</option>
            <option value="2">Male</option>
            <option value="3">Non-Binary</option>
            <option value="99">Self-Describe</option>
          </select>
          <br></br>
          <label className={signUpStyles.placeholder}>Describe Gender:</label>
          <input
            className={signUpStyles.input}
            type="text"
            ref={genderDescribeRef}
          />
          <br></br>
          <div>
            <label className={signUpStyles.placeholder}>Race:</label>
          </div>
          <label className={signUpStyles.placeholder}>
            Black/African American:
          </label>
          <input type="checkbox" ref={race_blRef} />
          <label className={signUpStyles.placeholder}>American Indian:</label>
          <input type="checkbox" ref={race_aiRef} />
          <label className={signUpStyles.placeholder}>Asian:</label>
          <input type="checkbox" ref={race_asRef} />
          <label className={signUpStyles.placeholder}>
            Native Hawaiian/Pacific Islander:
          </label>
          <input type="checkbox" ref={race_nhpiRef} />
          <label className={signUpStyles.placeholder}>White:</label>
          <input type="checkbox" ref={race_whRef} />
          <label className={signUpStyles.placeholder}>Other:</label>
          <input type="checkbox" ref={race_otherRef} />
          <br></br>
          <label className={signUpStyles.placeholder}>Describe Race:</label>
          <input
            className={signUpStyles.input}
            type="text"
            ref={race_other_specifyRef}
          />
          <br></br>
          <label className={signUpStyles.placeholder}>Ethnicity:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={ethnicityRef}
            required
          >
            <option value=""> -- select an option -- </option>
            <option value="0">Non-Hispanic</option>
            <option value="1">Hispanic</option>
          </select>
          <br></br>
          <label className={signUpStyles.placeholder}>Free Lunch:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={freeLunchRef}
            required
          >
            <option value=""> -- select an option -- </option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
          <br></br>
          <label className={signUpStyles.warning} id="values" hidden>
            Missing values!
          </label>
          <button className={signUpStyles.submit} onClick={createDemographics}>
            Add Demographics
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateDemographics;
