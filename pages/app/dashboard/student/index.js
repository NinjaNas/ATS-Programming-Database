//Landing Page for Boomerang Student
import React from "react";
import Link from "next/link";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";
import TaskList from "../../../../components/dashboard/tasklist.js";
import Footer from "../../../../components/dashboard/footer.js";

function Student() {
	return (
		<div className={pageStyles.mainPage}>
			<StudentNav></StudentNav>
			<TaskList></TaskList>
			<Footer></Footer>
		</div>
	);
}

export default Student;
