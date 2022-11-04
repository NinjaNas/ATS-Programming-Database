import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";

function questionnaire() {
	return (
		<div className={pageStyles.mainPage}>
			<StudentNav></StudentNav>
		</div>
	);
}

export default questionnaire;
