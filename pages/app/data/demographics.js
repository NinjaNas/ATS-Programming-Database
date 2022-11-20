import React from "react";
import pageStyles from "../../../styles/Data.module.css";
import Navbar from "../../../components/dashboard/adminNav.js";
import Footer from "../../../components/dashboard/footer.js";
import Districts from "../../../components/data/demographics/districts";
import Grades from "../../../components/data/demographics/grades";
import Race from "../../../components/data/demographics/race";

function demographics() {
	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
			<div
				style={{ display: "inline-block" }}
				className={pageStyles.dataContainer}> 
				<Districts></Districts>
			</div>
			<div
				style={{ display: "inline-block" }}
				className={pageStyles.dataContainer}>
				<Grades></Grades>
			</div>
			<div
				style={{ display: "inline-block" }}
				className={pageStyles.dataContainer}>
				<Race></Race>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default demographics;
