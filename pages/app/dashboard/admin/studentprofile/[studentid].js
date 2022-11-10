//Landing Page for Boomerang Staff
import React from "react";
// import pageStyles from "../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
// import Students from "../../../../components/dashboard/currentStudents";
// import Footer from "../../../../components/dashboard/footer.js";
import { useRouter } from 'next/router'

import { useEffect } from "react";

function StudentProfile() {
  const router = useRouter()
  const { studentid } = router.query

  return (<p>Post: {studentid}</p>)

}

export default StudentProfile;
