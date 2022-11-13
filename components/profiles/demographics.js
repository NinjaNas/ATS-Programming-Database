import React, { useEffect, useRef, useState } from 'react'
import Axios from "axios";
import InputForm from '../form/input';
import Dropdown from '../form/dropdown';
import CheckBox from '../form/checkbox';

function Demographics({id}) {
  const [demographics, setDemographics] = useState([]);
  const demographicsInfo = () => {
    Axios.get("http://localhost:3000/api/demographics").then((response) => {
      setDemographics(response.data.filter(s => s.user_id == id));
    });
  };

  const genderRef = useRef()
  const raceRef = useRef()

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

  function displayRace(data){
    let races = []
    for (const [key, value] of Object.entries(race)) {
      // console.log(`${key}: ${value}`);
        if (data[key] == 1){
          races.push(value)
        }
      }
      return races.join("/")
    }
  return (
    
    <div>
      {demographics.map(data => (
          <>
            <p>Date of Birth: {(new Date(data.date_of_birth)).toLocaleDateString()}</p>
            <label>Date of Birth</label>
            <input type="date" defaultValue={(new Date(data.date_of_birth)).toLocaleDateString('en-CA')} />
            {/* <p>Gender: {gender[data.gender]}</p> */}
            {/* <InputForm label="Gender" ref={genderRef} passedValue={gender[data.gender]} /> */}
            <Dropdown label="Gender" ref={genderRef} passedValue={data.gender} passedOptions={gender}/>

            {/* <p>Race: {displayRace(data)}</p> */}
            <CheckBox label="Race" ref={raceRef} passedValue = {data} passedOptions={race} />
          </>
          )
        )
      }
    
    </div>
  )
}

export default Demographics