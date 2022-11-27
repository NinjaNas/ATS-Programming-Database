//Landing Page for Boomerang Staff
import React from "react";
import pageStyles from "../../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../../components/dashboard/adminNav";

import StudentHeader from "../../../../../../components/studentProfile/StudentHeader";
import Footer from "../../../../../../components/dashboard/footer.js";
import { useRouter } from "next/router";
import Axios from "axios";

import { useState, useEffect } from "react";
import SessionRead from "../../../../../../components/profiles/sessionRead";
import DemographicsRead from "../../../../../../components/profiles/demographicsRead";
import ContactRead from "../../../../../../components/profiles/ContactRead";
import MedicalRead from "../../../../../../components/profiles/medicalRead";

function StudentProfile() {
  const router = useRouter();
  const { studentid } = router.query;
  const [student, setStudent] = useState();

  const studentInfo = () => {
    Axios.get("/api/user/read", {
      params: { key: 0, tag: studentid },
    }).then((response) => {
      //console.log(studentid);
      //  setStudent(response.data.filter(s => s.id == studentid));
      setStudent(response.data[0]);
      //  setStudent[student.filter(s => student.id == studentid)]
    });
  };

  // https://github.com/vercel/next.js/discussions/11484
  useEffect(() => {
    studentInfo();
  }, [studentid]);

  return (
    <div className={pageStyles.longerPage}>
      <Navbar></Navbar>

      {studentid && student && (
        <>
          <StudentHeader
            key={student.id}
            firstName={student.first_name}
            lastName={student.last_name}
          />
          <ContactRead user_id={student.id} />
          <MedicalRead id={student.id} />
          <DemographicsRead id={student.id} />
          <SessionRead user_id={student.id} />
        </>
      )}
      <Footer></Footer>
    </div>
  );
}

export default StudentProfile;
