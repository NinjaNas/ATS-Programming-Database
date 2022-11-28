import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";
import TaskWrapper from "../../../../components/dashboard/studentTasklistWrapper";
import Footer from "../../../../components/dashboard/footer";

function tasklist() {
  return (
    <div className={pageStyles.mainPage}>
      <StudentNav></StudentNav>
      <TaskWrapper></TaskWrapper>
      <Footer></Footer>
    </div>
  );
}

export default tasklist;
