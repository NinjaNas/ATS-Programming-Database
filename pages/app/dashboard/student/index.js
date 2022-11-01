//Landing Page for Boomerang Student
import React from "react";
import Link from "next/link";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";
import TaskList from "../../../../components/dashboard/tasklist.js";

function Student() {
	return (
		<div className={pageStyles.mainPage}>
			<StudentNav></StudentNav>
			<TaskList></TaskList>
		</div>
	);
}

export default Student;
