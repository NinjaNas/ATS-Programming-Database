import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";
import Tasks from "../../../../components/dashboard/taskPage.js";
import AddTask from "../../../../components/dashboard/addTask.js";
import Footer from "../../../../components/dashboard/footer";

function tasklist() {
	return (
		<div className={pageStyles.mainPage}>
			<StudentNav></StudentNav>

			<div className={pageStyles.studentDash}>
				<Tasks title='Academic'></Tasks>
				<Tasks title='Boomerang'></Tasks>
				<div className={pageStyles.addTask}>
					<AddTask></AddTask>
				</div>
			</div>

			<Footer></Footer>
		</div>
	);
}

export default tasklist;
