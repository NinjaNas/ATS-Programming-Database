import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import InputForm from "../forms/input";
import Dropdown from "../forms/dropdown";
import CheckBox from "../forms/checkbox";
import DateForm from "../forms/date";
import { useRouter } from "next/router";
import ethnicity from "../../constants/ethnicity";
import gender from "../../constants/gender";
import yesno from "../../constants/yesno";
import FormStyles from "../../styles/Forms.module.css";

function DemographicsEdit({ id }) {
  const [demographics, setDemographics] = useState();
  const [genderValue, setGenderValue] = useState();
  const [raceOther, setRaceOther] = useState();

  const router = useRouter();

  const demographicsInfo = () => {
    Axios.get("/api/demographics/read/", { params: { key: 0, tag: id } }).then(
      (response) => {
        // setDemographics(response.data.filter(s => s.user_id == id));
        setDemographics(response.data[0]);
      }
    );
  };

  const onSave = () => {
    console.log(genderRef.current.value);
    const body = {
      date_of_birth: dobRef.current.value != "" ? dobRef.current.value : null,
      gender: genderRef.current.value != "" ? genderRef.current.value : null,
      // genderOtherRef.current is undefined if input is not created with ref
      gender_other: genderOtherRef.current
        ? genderOtherRef.current.value
        : null,
      race_bl: raceBLRef.current.checked ? 1 : 0,
      race_ai: raceAIRef.current.checked ? 1 : 0,
      race_as: raceASRef.current.checked ? 1 : 0,
      race_nhpi: raceNHPIRef.current.checked ? 1 : 0,
      race_wh: raceWHRef.current.checked ? 1 : 0,
      race_other: raceOTHERRef.current.checked ? 1 : 0,
      // raceOtherSpecifyRef.current is undefined if input is not created with ref
      race_other_specify: raceOtherSpecifyRef.current
        ? raceOtherSpecifyRef.current.value
        : null,
      ethnicity:
        ethnicityRef.current.value != "" ? ethnicityRef.current.value : null,
      free_lunch:
        freeLunchRef.current.value != "" ? freeLunchRef.current.value : null,
      user_id: demographics.user_id,
    };
    Axios.post("/api/demographics/update", body).then(
      router.push(`/app/dashboard/admin/studentprofile/${id}`)
    );
  };

  const dobRef = useRef();
  const genderRef = useRef();
  const genderOtherRef = useRef();
  const raceBLRef = useRef();
  const raceAIRef = useRef();
  const raceASRef = useRef();
  const raceNHPIRef = useRef();
  const raceWHRef = useRef();
  const raceOTHERRef = useRef();
  const raceOtherSpecifyRef = useRef();
  const ethnicityRef = useRef();
  const freeLunchRef = useRef();

  useEffect(() => {
    console.log(id);
    demographicsInfo();
  }, []);

  useEffect(() => {
    if (demographics) {
      setGenderValue(demographics.gender);
      setRaceOther(demographics.race_other);
    }
  }, [demographics]);

  function changeGender() {
    setGenderValue(genderRef.current.value);
  }

  function changeRaceOtherValue() {
    setRaceOther(raceOTHERRef.current.checked);
  }

  return (
    <div className={FormStyles.editForm}>
      {demographics && (
        <>
          <DateForm
            label="Date of Birth"
            ref={dobRef}
            passedValue={demographics.date_of_birth}
          />
          <Dropdown
            label="Gender"
            ref={genderRef}
            passedValue={demographics.gender}
            passedOptions={gender}
            onChange={changeGender}
          />

          {genderValue == 99 && (
            <InputForm
              label="Specify Other Gender"
              ref={genderOtherRef}
              passedValue={demographics.gender_other}
            />
          )}

          <label>Race</label>
          <CheckBox
            ref={raceBLRef}
            label={"Black, African-American"}
            passedValue={demographics.race_bl}
          />
          <CheckBox
            ref={raceAIRef}
            label={"American Indian"}
            passedValue={demographics.race_ai}
          />
          <CheckBox
            ref={raceASRef}
            label={"Asian"}
            passedValue={demographics.race_as}
          />
          <CheckBox
            ref={raceNHPIRef}
            label={"Native Hawaiian, Pacific Islander"}
            passedValue={demographics.race_nhpi}
          />
          <CheckBox
            ref={raceWHRef}
            label={"White"}
            passedValue={demographics.race_wh}
          />
          <CheckBox
            ref={raceOTHERRef}
            label={"Other"}
            passedValue={demographics.race_other}
            onChange={changeRaceOtherValue}
          />
          {raceOther ? (
            <InputForm
              ref={raceOtherSpecifyRef}
              label="Specify Other Race"
              passedValue={demographics.race_other_specify}
            />
          ) : (
            <></>
          )}

          {/* <InputForm label="Specify Other Race" ref={raceOtherSpecifyRef} passedValue = {demographics.race_other_specify} />             */}
          <Dropdown
            label="Ethnicity"
            ref={ethnicityRef}
            passedValue={demographics.ethnicity}
            passedOptions={ethnicity}
          />
          <Dropdown
            label="Free Lunch"
            ref={freeLunchRef}
            passedValue={demographics.free_lunch}
            passedOptions={yesno}
          />
          <input type="submit" value="Save" onClick={onSave} />
        </>
      )}
    </div>
  );
}

export default DemographicsEdit;
