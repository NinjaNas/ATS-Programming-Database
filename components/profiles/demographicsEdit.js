import React, { useEffect, useRef, useState } from 'react'
import Axios from "axios";
import InputForm from '../forms/input';
import Dropdown from '../forms/dropdown';
import CheckBox from '../forms/checkbox';
import DateForm from '../forms/date';
import { useRouter } from 'next/router';


function DemographicsEdit({id}) {
  const [demographics, setDemographics] = useState();
  const [genderValue, setGenderValue] = useState();
  const [raceOther, setRaceOther] = useState();

  const router = useRouter();

  const demographicsInfo = () => {
    Axios.get("/api/demographics/read/", {params: {key:0, tag:id}}).then((response) => {
      // setDemographics(response.data.filter(s => s.user_id == id));
      setDemographics(response.data[0]);
    });
  };

  const onSave = () => {
    const body = {
      date_of_birth: dobRef.current.value,
      gender: genderRef.current.value,
      gender_other: genderOtherRef.current ? genderOtherRef.current.value : "",
      race_bl: raceBLRef.current.checked ? 1 : 0,
      race_ai: raceAIRef.current.checked ? 1 : 0,
      race_as: raceASRef.current.checked ? 1 : 0,
      race_nhpi: raceNHPIRef.current.checked ? 1 : 0,
      race_wh: raceWHRef.current.checked ? 1 : 0,
      race_other: raceOTHERRef.current.checked ? 1 : 0,
      race_other_specify: raceOtherSpecifyRef.current? raceOtherSpecifyRef.current.value : "",
      ethnicity: ethnicityRef.current.value,
      free_lunch: freeLunchRef.current.value,
      user_id: demographics.user_id,
    }
    Axios.post("/api/demographics/update",body).then(
      router.push(`/app/dashboard/admin/studentprofile/${id}`)
    )
    // console.log(`dob ${dobRef.current.value}`)
    // console.log(`gender ${genderRef.current.value}`)
    // console.log(`race_bl ${raceBLRef.current.checked}`)
    // console.log(`race_ai ${raceAIRef.current.checked}`)
    // console.log(`race_as ${raceASRef.current.checked}`)
    // console.log(`race_nhpi ${raceNHPIRef.current.checked}`)
    // console.log(`race_wh ${raceWHRef.current.checked}`)
    // console.log(`race_other ${raceOTHERRef.current.checked}`)

    // console.log(`gender_other ${genderOtherRef.current.value}`)
    // console.log(`race_other_specify ${raceOtherSpecifyRef.current.value}`)
    // console.log(`ethnicity ${ethnicityRef.current.value}`)
    // console.log(`free_lunch ${freeLunchRef.current.value}`)
  }

  const dobRef = useRef()
  const genderRef = useRef()
  const genderOtherRef = useRef()
  const raceBLRef = useRef()
  const raceAIRef = useRef()

  const raceASRef = useRef()
  const raceNHPIRef = useRef()
  const raceWHRef = useRef()
  const raceOTHERRef = useRef()
  const raceOtherSpecifyRef = useRef()
  const ethnicityRef = useRef()
  const freeLunchRef = useRef()

  const ethnicity = {
    1: "Hispanic",
    0: "Non-Hispanic"
  }

  const gender = {
    1: "Female", 
    2: "Male", 
    3: "Non Binary", 
    99: "Self-Describe"}
  
  const race = {
    race_bl: "Black, African-American",
    race_ai: "American Indian",
    race_as: "Asian",
    race_nhpi: "Native Hawaiian, Pacific Islander",
    race_wh: "White",
    race_other: "Other"
  }

  useEffect(() => {
    console.log(id)
    demographicsInfo();
    
  }, [])

  useEffect(() => {
    if (demographics){
      setGenderValue(demographics.gender)
      setRaceOther(demographics.race_other)
      // console.log(raceOther)
    }
  }, [demographics])

  function changeGender() {
    setGenderValue(genderRef.current.value);
  }

  function changeRaceOtherValue() {
    // console.log(raceOTHERRef.current.value)
    setRaceOther(raceOTHERRef.current.checked);
    // console.log(raceOther)
    // console.log(raceOTHERRef.current.value)
  }


  return (
    
    <div>
      {demographics && (
          <>
            <DateForm label="Date of Birth" ref={dobRef} passedValue={demographics.date_of_birth} />
            <Dropdown label="Gender" ref={genderRef} passedValue={demographics.gender} passedOptions={gender} onChange={changeGender}/>
            
            {genderValue == 99 && <InputForm label="Specify Other Gender" ref={genderOtherRef} passedValue = {demographics.gender_other} />}

            <label>Race</label>
            <CheckBox ref={raceBLRef} label={"Black, African-American"} passedValue={demographics.race_bl} />
            <CheckBox ref={raceAIRef} label={"American Indian"} passedValue={demographics.race_ai} />
            <CheckBox ref={raceASRef} label={"Asian"} passedValue={demographics.race_as} />
            <CheckBox ref={raceNHPIRef} label={"Native Hawaiian, Pacific Islander"} passedValue={demographics.race_nhpi} />
            <CheckBox ref={raceWHRef} label={"White"} passedValue={demographics.race_wh} />
            <CheckBox ref={raceOTHERRef} label={"Other"} passedValue={demographics.race_other} onChange={changeRaceOtherValue}/>
            {raceOther ? <InputForm ref={raceOtherSpecifyRef} label="Scpecify Other Race" passedValue={demographics.race_other_specify}/>: <></>}
            
            {/* <InputForm label="Specify Other Race" ref={raceOtherSpecifyRef} passedValue = {demographics.race_other_specify} />             */}
            <Dropdown label="Ethnicity" ref={ethnicityRef} passedValue={demographics.ethnicity} passedOptions={ethnicity} />
            <Dropdown label="Free Lunch" ref={freeLunchRef} passedValue={demographics.free_lunch} passedOptions={{1: "Yes", 0: "No"}} />
            <input type="submit" value="Save" onClick={onSave}/>
          </>
          )
        
      }
    
    </div>
  )
}

export default DemographicsEdit