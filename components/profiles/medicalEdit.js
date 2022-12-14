import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import InputForm from "../forms/input";
import Dropdown from "../forms/dropdown";
import { useRouter } from "next/router";
import relationships from "../../constants/relationships";
import hosptial from "../../constants/hosptial";
import yesno from "../../constants/yesno";
import FormStyles from "../../styles/Forms.module.css";

function MedicalEdit({ id }) {
  const [info, setInfo] = useState();

  const router = useRouter();

  const medicalInfo = () => {
    Axios.get("/api/medical/read/", { params: { key: 0, tag: id } })
      .then((response) => {
        setInfo(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  const onSave = () => {
    // Password is not passed if it is not needed to be updated
    const body = {
      contact_name:
        contactNameRef.current.value != ""
          ? contactNameRef.current.value
          : null,
      contact_relationship:
        relationRef.current.value != "" ? relationRef.current.value : null,
      contact_phone:
        numberRef.current.value != "" ? numberRef.current.value : null,
      physician:
        physicianRef.current.value != "" ? physicianRef.current.value : null,
      hospital:
        hospitalRef.current.value != "" ? hospitalRef.current.value : null,
      medical_concerns:
        concernRef.current.value != "" ? concernRef.current.value : null,
      allergies_list:
        allergyListRef.current.value != ""
          ? allergyListRef.current.value
          : null,
      allergies:
        allergyFlagRef.current.value != ""
          ? allergyFlagRef.current.value
          : null,
      user_id: id,
    };

    Axios.post("/api/medical/update", body)
      .then(router.push(`/app/dashboard/admin/studentprofile/${id}`))
      .catch((err) => {
        console.log(err);
      });
  };

  const contactNameRef = useRef();
  const relationRef = useRef();
  const numberRef = useRef();
  const physicianRef = useRef();
  const hospitalRef = useRef();
  const concernRef = useRef();
  const allergyListRef = useRef();
  const allergyFlagRef = useRef();

  useEffect(() => {
    medicalInfo();
  }, []);

  useEffect(() => {}, [info]);

  return (
    <div
      className={FormStyles.editForm}
      style={{ height: "120%", width: "40%" }}
    >
      {info && (
        <>
          <h3>Type: {info.type}</h3>
          {
            <InputForm
              label="Contact Name"
              ref={contactNameRef}
              passedValue={info.contact_name}
            />
          }
          <Dropdown
            label="Contact Relationship"
            ref={relationRef}
            passedValue={info.contact_relationship}
            passedOptions={relationships}
          />
          {
            <InputForm
              label="Contact Number"
              ref={numberRef}
              passedValue={info.contact_phone}
            />
          }
          {
            <InputForm
              label="Physician"
              ref={physicianRef}
              passedValue={info.physician}
            />
          }
          <Dropdown
            label="Hospital Preference"
            ref={hospitalRef}
            passedValue={info.hospital}
            passedOptions={hosptial}
          />
          {
            <InputForm
              label="Medical Concerns"
              ref={concernRef}
              passedValue={info.medical_concerns}
            />
          }
          <Dropdown
            label="Allergies"
            ref={allergyFlagRef}
            passedValue={info.allergies}
            passedOptions={yesno}
          />
          {
            <InputForm
              label="Allergy List"
              ref={allergyListRef}
              passedValue={info.allergies_list}
            />
          }
          <input type="submit" value="Save" onClick={onSave} />
        </>
      )}
    </div>
  );
}

export default MedicalEdit;
