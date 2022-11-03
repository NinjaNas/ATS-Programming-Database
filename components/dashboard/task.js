import React from "react";
import taskStyles from "../../styles/Task.module.css"

function task({ id, task_name, due_date, task_description, status }) {
    const statusDict = ["On Hold", "Started", "Completed", "Verified"];
	return (
		<div className={`${taskStyles.task} ${taskStyles.container}`}>
			<h4 className={taskStyles["task-item"]}>{task_name}</h4>
			<h5 className={taskStyles["task-item"]}>Due: {due_date}</h5>
			<h5 className={taskStyles["task-item"]}>{status > 0 ? statusDict[status] : statusDict[0]}</h5>
		</div>
	);
}

export default task;

