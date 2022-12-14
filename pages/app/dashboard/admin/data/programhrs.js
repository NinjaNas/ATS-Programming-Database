import React from "react";
import pageStyles from "../../../../../styles/Data.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
import Footer from "../../../../../components/dashboard/footer.js";
import SEL from "../../../../../components/data/sessionsData/selHrs";
import Return from "../../../../../components/data/sessionsData/returning";

function programhrs() {
  return (
    <div className={pageStyles.mainPage}>
      <Navbar></Navbar>
      <div
        style={{ display: "inline-block" }}
        className={pageStyles.dataContainer}
      >
        <h2 className={pageStyles.title}>Program Hours</h2>
        <SEL></SEL>
      </div>
      <div
        style={{ display: "inline-block" }}
        className={pageStyles.dataContainer}
      >
        <h2 className={pageStyles.title}>Returning Students</h2>
        <Return></Return>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default programhrs;
