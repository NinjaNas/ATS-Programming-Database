import React from "react";
import pageStyles from "../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
import Footer from "../../../../../components/dashboard/footer.js";
import { useRouter } from "next/router";
import Axios from "axios";
import { useState, useEffect } from "react";

function editUser() {
  const router = useRouter();
  const { userid } = router.query
  const [user, setUser] = useState();

  const studentInfo = () => {
    Axios.get("http://localhost:3000/api/user/read", {params: {key:0, tag:studentid}}).then((response) => {
      // console.log(studentid);
      //  setStudent(response.data.filter(s => s.id == studentid));
      setStudent(response.data[0])
      //  setStudent[student.filter(s => student.id == studentid)]
    });
  };


  useEffect(() => {
    studentInfo();
  }, [studentid])

  return (
    <>
      <Navbar />
      {studentid && student && <StudentHeader id={studentid} firstName={student.first_name} lastName={student.last_name}/>}
      {contactid && <ContactEdit id={contactid} />}
    </>
    )
}

export default editUser
