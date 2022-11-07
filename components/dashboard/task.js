import React from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";

function task({ id, task_name, due_date, task_description, status }) {
	const statusDict = ["On Hold", "Started", "Completed", "Verified"];
	return (
		<div>
			<h4 className={DashboardStyles.taskName}>{task_name}</h4>
			<h5 className={DashboardStyles.taskRest}>Due: {due_date}</h5>
			<input className={DashboardStyles.taskRest} type="checkbox"></input>
			{/*<h5 className={DashboardStyles.text}>
				{status > 0 ? statusDict[status] : statusDict[0]}
			</h5>*/}
		</div>
	);
}

export default task;
