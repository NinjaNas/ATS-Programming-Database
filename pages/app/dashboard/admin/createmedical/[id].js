import React from "react";
import { useRef } from "react";
import Axios from "axios";
import signUpStyles from "../../../../../styles/Login.module.css";
import { useRouter } from "next/router";

function CreateMedical() {
  const contactNameRef = useRef();
  const relationRef = useRef();
  const numberRef = useRef();
  const physicianRef = useRef();
  const hospitalRef = useRef();
  const concernRef = useRef();
  const allergyListRef = useRef();
  const allergyFlagRef = useRef();

  const router = useRouter();
  const { id } = router.query;

  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const createMedical = () => {
    Axios.post("/api/medical/create", {
      contact_name: contactNameRef.current.value,
      contact_relationship: relationRef.current.value,
      contact_phone: numberRef.current.value,
      physician: physicianRef.current.value,
      hospital: hospitalRef.current.value,
      medical_concerns: concernRef.current.value,
      allergies_list: allergyListRef.current.value,
      allergies: allergyFlagRef.current.value,
      id: id,
    })
      .then(() => {
        console.log("success");
        router.push(`/app/dashboard/admin/studentprofile/${id}`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
        document.getElementById("values").removeAttribute("hidden");
      });
  };

  return (
    <div className={signUpStyles.login}>
      <div className={signUpStyles.form}>
        <div className={signUpStyles.input_container}>
          <label className={signUpStyles.placeholder}>Contact Name:</label>
          <input
            className={signUpStyles.input}
            type="text"
            ref={contactNameRef}
          />
          <br></br>

          <label className={signUpStyles.placeholder}>
            Contact Relationship:
          </label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={relationRef}
            required
          >
            <option value=""> -- select an option -- </option>
            <option value="Parent">Parent</option>
            <option value="Partner">Partner</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
          <br></br>

          <label className={signUpStyles.placeholder}>Contact Number:</label>
          <input className={signUpStyles.input} type="tel" ref={numberRef} />
          <br></br>

          <label className={signUpStyles.placeholder}>Hospital:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={hospitalRef}
            required
          >
            <option value=""> -- select an option -- </option>
            <option value="1">UNC</option>
            <option value="2">Duke</option>
            <option value="3">Other</option>
          </select>
          <br></br>

          <label className={signUpStyles.placeholder}>Physician</label>
          <input
            className={signUpStyles.input}
            type="text"
            ref={physicianRef}
          />
          <br></br>

          <label className={signUpStyles.placeholder}>Medical Concerns</label>
          <input className={signUpStyles.input} type="text" ref={concernRef} />
          <br></br>

          <label className={signUpStyles.placeholder}>Allergies:</label>
          <select
            className={signUpStyles.input}
            name="type"
            id="type"
            ref={allergyFlagRef}
          >
            <option disabled selected value>
              {" "}
              -- select an option --{" "}
            </option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
          <br></br>

          <label className={signUpStyles.placeholder}>Allergy List</label>
          <input
            className={signUpStyles.input}
            type="text"
            ref={allergyListRef}
          />
          <br></br>

          <label className={signUpStyles.warning} id="values" hidden>
            Missing values!
          </label>
          <button className={signUpStyles.submit} onClick={createMedical}>
            Add Medical
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateMedical;
