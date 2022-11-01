import React from "react";

function task({ id, task_name, due_date, task_description, status }) {
    const statusDict = ["On Hold", "Started", "Completed", "Verified"];
	return (
		<div>
			<h4>{task_name}</h4>
			<h5>Due: {due_date}</h5>
			<h5>{status > 0 ? statusDict[status] : statusDict[0]}</h5>
		</div>
	);
}

export default task;

