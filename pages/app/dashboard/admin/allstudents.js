import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import Navbar from "../../../../components/dashboard/adminNav.js";
import Students from "../../../../components/dashboard/allStudents";
import Footer from "../../../../components/dashboard/footer.js";

function allstudents() {
  return (
    <div className={pageStyles.mainPage}>
      <Navbar></Navbar>
      <Students />
      <Footer></Footer>
    </div>
  );
}

export default allstudents;
