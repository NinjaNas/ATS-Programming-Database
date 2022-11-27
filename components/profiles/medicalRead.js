import React, { useEffect, useRef, useState } from 'react'
import Axios from "axios";
import { useRouter } from 'next/router';
import Link from 'next/link';
import CardStyles from "../../styles/Cards.module.css"
import race from '../../constants/race';
import gender from '../../constants/gender';
import ethnicity from '../../constants/ethnicity';

function MedicalRead({id}) {
  const [medical, setMedical] = useState();
  const [genderString, setGenderString] = useState();
  const [raceString, setRaceString] = useState();

  const router = useRouter();

  const medicalInfo = () => {
    Axios.get("/api/medical/read/", {params: {key:0, tag:id}}).then((response) => {
      setMedical(response.data[0]);
    });
  };




  useEffect(() => {    
    medicalInfo();
  }, [])

  useEffect(() => {
    if (medical){
      setGenderString(gender[medical.gender])
      setRaceString((()=>{
        let races = []
        Object.entries(race).forEach(([k, v]) => {
          if (medical[k] == 1){
            races.push(v)
          }
        } )
        console.log(races)
        return races.join(", ")
      })())
    }
  }, [medical])


  return (
    
    <div>
      {medical && (
          <div className={CardStyles.card}>
            <h2>Medical</h2>
            <p>Contact Name: {medical.contact_name}</p>
            <p>Contact Relationship: {medical.contact_relationship}</p>
            <p>Contact Phone Number: {medical.contact_phone}</p>
            <p>Physician: {medical.physician}</p>

            <p>Hospital:
            {medical.hospital == 1 && " UNC" || medical.hospital == 2 && " Duke" || " Other"} </p>
            <p>Medical Concerns: {medical.medical_concerns}</p>

            <p>Allergies: 
            {medical.allergies == medical.allergies_list }</p>

            
            <Link href={`/app/dashboard/admin/studentprofile/${id}/medical`}><a>Edit Profile</a></Link>
          </div>
          )
        
      }
    
    </div>
  )
}

export default MedicalRead