import React, { useEffect, useRef, useState } from 'react'
import Axios from "axios";
import InputForm from '../forms/input';
import Dropdown from '../forms/dropdown';
import CheckBox from '../forms/checkbox';
import DateForm from '../forms/date';

function Demographics({id}) {
  const [demographics, setDemographics] = useState([]);
  const demographicsInfo = () => {
    Axios.get("http://localhost:3000/api/demographics/read/", {params: {key:0, tag:id}}).then((response) => {
      // setDemographics(response.data.filter(s => s.user_id == id));
      setDemographics(response.data);
    });
  };

  const dobRef = useRef()
  const genderRef = useRef()
  const genderOtherRef = useRef()
  const raceRef = useRef()
  const raceOtherRef = useRef()
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
    999: "Self-Describe"}
  
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


  return (
    
    <div>
      {demographics.map(data => (
          <>
            <DateForm label="Date of Birth" ref={dobRef} passedValue={data.date_of_birth} />
            <Dropdown label="Gender" ref={genderRef} passedValue={data.gender} passedOptions={gender}/>
            {data.gender>999 ? (<InputForm label="Specify Other Gender" ref={genderOtherRef} passedValue = {data.gender_other} />) : <></>}

            <CheckBox label="Race" ref={raceRef} passedValue = {data} passedOptions={race} />
            {data.race_other==1 ? (<InputForm label="Specify Other Race" ref={raceOtherRef} passedValue = {data.race_other_specify} />) : <></>}
            <Dropdown label="Ethnicity" ref={ethnicityRef} passedValue={data.ethnicity} passedOptions={ethnicity} />
            <Dropdown label="Free Lunch" ref={freeLunchRef} passedValue={data.free_lunch} passedOptions={{1: "Yes", 0: "No"}} />
          </>
          )
        )
      }
    
    </div>
  )
}

export default Demographics