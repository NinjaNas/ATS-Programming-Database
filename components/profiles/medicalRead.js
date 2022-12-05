import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import CardStyles from "../../styles/Cards.module.css";

function MedicalRead({ id }) {
  const [medical, setMedical] = useState();
  const [display, setDisplay] = useState("none");

  const medicalInfo = () => {
    Axios.get("/api/medical/read/", { params: { key: 0, tag: id } })
      .then((response) => {
        setMedical(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  const expand = () => {
    display == "none" ? setDisplay("block") : setDisplay("none");
  };

  useEffect(() => {
    medicalInfo();
  }, []);

  useEffect(() => {}, [medical]);

  return (
    <div className={CardStyles.card}>
      <button className={CardStyles.displayLink} onClick={expand}>
        Medical
      </button>
      {medical && (
        <div style={{ display: display }}>
          <p>Contact Name: {medical.contact_name}</p>
          <p>Contact Relationship: {medical.contact_relationship}</p>
          <p>Contact Phone Number: {medical.contact_phone}</p>
          <p>Physician: {medical.physician}</p>

          <p>
            Hospital:
            {(medical.hospital == 1 && " UNC") ||
              (medical.hospital == 2 && " Duke") ||
              " Other"}{" "}
          </p>
          <p>Medical Concerns: {medical.medical_concerns}</p>

          <p>
            Allergies:
            {medical.allergies == medical.allergies_list}
          </p>

          <Link href={`/app/dashboard/admin/studentprofile/${id}/medical`}>
            <a>Edit Profile</a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MedicalRead;
