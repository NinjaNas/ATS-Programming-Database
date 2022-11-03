import React from "react";
import { useState } from "react";
import Task from "./task.js";
import DashboardStyles from "../../styles/Dashboard.module.css";

function tasklist(
	{
		/* task */
	}
) {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			task_name: "Something",
			due_date: "1/3/2022",
			task_description: "",
			status: 2,
		},
		{
			id: 2,
			task_name: "Academic",
			due_date: "1/1/2022",
			task_description: "",
			status: 1,
		},
		{
			id: 3,
			task_name: "Boomerang",
			due_date: "1/1/2022",
			task_description: "",
			status: -1,
		},
	]);

	return (
		<div className={DashboardStyles.tasklist}>
			<h2 className={DashboardStyles.title}>My Tasks</h2>
			<div>
				<div>
					<h3 className={DashboardStyles.subtitle}>Academic</h3>
					{tasks.map((task) => (
						<Task
							id={task.id}
							task_name={task.task_name}
							due_date={task.due_date}
							task_description={task.task_description}
							status={task.status}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default tasklist;
