import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";
import Footer from "../../../../components/dashboard/footer";
import SubmitQuiz from "../../../../components/dashboard/submitQuiz.js";
function questionnaire() {
	return (
		<div className={pageStyles.longerPage}>
			<StudentNav></StudentNav>
			<div className={pageStyles.studentDash}>
				<SubmitQuiz></SubmitQuiz>
				
			</div>

			<Footer></Footer>
		</div>
	);
}

export default questionnaire;
