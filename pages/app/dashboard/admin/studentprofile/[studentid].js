//Landing Page for Boomerang Staff
import React from "react";
import pageStyles from "../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
import StudentHeader from "../../../../../components/studentProfile/StudentHeader";
import Footer from "../../../../../components/dashboard/footer.js";
import { useRouter } from "next/router";
import Axios from "axios";

import { useState, useEffect } from "react";
import Demographics from "../../../../../components/profiles/demographics";

function StudentProfile() {
  const router = useRouter();
  // console.log(router.query);
  const { studentid } = router.query;
  const [student, setStudent] = useState([]);

  const studentInfo = () => {
    Axios.get("http://localhost:3000/api/user/read", {params: {key:0, tag:studentid}}).then((response) => {
      // console.log(studentid);
      //  setStudent(response.data.filter(s => s.id == studentid));
      setStudent(response.data)
      //  setStudent[student.filter(s => student.id == studentid)]
    });
  };

// https://github.com/vercel/next.js/discussions/11484
  useEffect(() => {
    studentInfo();
  }, [studentid])

  return (
    <div className={pageStyles.mainPage}>
      <Navbar></Navbar>

      {student.map((s) => (
        // <h1 key={s.id}>{s.first_name} {s.last_name}</h1>
				<>
				<StudentHeader key={s.id} firstName={s.first_name} lastName={s.last_name} />
				<Demographics id={s.id}/>
				</>
      ))}
      <Footer></Footer>
    </div>
  );
}

export default StudentProfile;
