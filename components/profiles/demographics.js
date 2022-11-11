import React, { useEffect, useState } from 'react'
import Axios from "axios";

function Demographics({id}) {
  const [demographics, setDemographics] = useState([]);
  const demographicsInfo = () => {
    Axios.get("http://localhost:3000/api/demographics").then((response) => {
      setDemographics(response.data.filter(s => s.user_id == id));
    });
  };

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
            <p>Date of Birth: {(new Date(data.date_of_birth)).toDateString()}</p>
            <p>Gender: {gender[data.gender]}</p>
            <p>Race: {displayRace(data)}</p>
          </>
          )
        )
      }
    
    </div>
  )
}

export default Demographics