import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";

function calender() {
	return (
		<div className={pageStyles.mainPage}>
			<StudentNav></StudentNav>
		</div>
	);
}

export default calender;
