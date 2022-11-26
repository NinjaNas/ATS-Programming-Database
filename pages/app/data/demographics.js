import React from "react";
import pageStyles from "../../../styles/Data.module.css";
import Navbar from "../../../components/dashboard/adminNav.js";
import Footer from "../../../components/dashboard/footer.js";
import Districts from "../../../components/data/demographics/districts";
import Grades from "../../../components/data/demographics/grades";
import Race from "../../../components/data/demographics/race";
import Ethnicity from "../../../components/data/demographics/ethnicity";

function demographics() {
  return (
    <div className={pageStyles.mainPage}>
      <Navbar></Navbar>
      <div
        style={{ display: "inline-block" }}
        className={pageStyles.dataContainer}
      >
        <h2 className={pageStyles.title}>Districts Served</h2>
        <Districts></Districts>
      </div>
      <div
        style={{ display: "inline-block" }}
        className={pageStyles.dataContainer}
      >
        <h2 className={pageStyles.title}>School Level</h2>
        <Grades></Grades>
      </div>
      <div
        style={{ display: "inline-block" }}
        className={pageStyles.dataContainer}
      >
        <h2 className={pageStyles.title}>Race</h2>
        <Race></Race>
      </div>
      <div
        style={{ display: "inline-block" }}
        className={pageStyles.dataContainer}
      >
        <h2 className={pageStyles.title}>Hispanic vs Non-Hispanic</h2>
        <Ethnicity></Ethnicity>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default demographics;
