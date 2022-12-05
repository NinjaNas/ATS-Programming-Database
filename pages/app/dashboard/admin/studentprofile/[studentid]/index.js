//Landing Page for Boomerang Staff
import React from "react";
import pageStyles from "../../../../../../styles/Dashboard.module.css";
import cardStyles from "../../../../../../styles/Cards.module.css";
import Navbar from "../../../../../../components/dashboard/adminNav";

import StudentHeader from "../../../../../../components/studentProfile/StudentHeader";
import Footer from "../../../../../../components/dashboard/footer.js";
import { useRouter } from "next/router";
import Axios from "axios";

import { useState, useEffect } from "react";
import SessionRead from "../../../../../../components/profiles/sessionRead";
import DemographicsRead from "../../../../../../components/profiles/demographicsRead";
import ContactRead from "../../../../../../components/profiles/ContactRead";
import Medical from "../../../../../../components/profiles/medicalRead";

function StudentProfile() {
  const router = useRouter();
  const { studentid } = router.query;
  const [student, setStudent] = useState();

  const studentInfo = () => {
    Axios.get("/api/user/read", {
      params: { key: 0, tag: studentid },
    })
      .then((response) => {
        setStudent(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  // https://github.com/vercel/next.js/discussions/11484
  useEffect(() => {
    studentInfo();
  }, [studentid]);

  return (
    <div className={pageStyles.mainPage}>
      <Navbar></Navbar>
      <div className={cardStyles.currentStud}>
        <div>
          {studentid && student && (
            <>
              <StudentHeader
                key={student.id}
                firstName={student.first_name}
                lastName={student.last_name}
              />
              <ContactRead user_id={student.id} />
              <DemographicsRead id={student.id} />
              <Medical id={student.id}></Medical>
              <SessionRead user_id={student.id} />
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default StudentProfile;
