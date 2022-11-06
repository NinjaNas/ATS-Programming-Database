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
			task_name: "Math",
			due_date: "1/3/2022",
			task_description: "",
			status: 2,
			type: "Academic",
		},
		{
			id: 2,
			task_name: "Math",
			due_date: "1/1/2022",
			task_description: "",
			status: 1,
			type: "Academic",
		},
		{
			id: 3,
			task_name: "Smart Goal",
			due_date: "1/1/2022",
			task_description: "",
			status: -1,
			type: "Boomerang",
		},
		{
			id: 1,
			task_name: "Math",
			due_date: "1/3/2022",
			task_description: "",
			status: 2,
			type: "Academic",
		},
		{
			id: 2,
			task_name: "Math",
			due_date: "1/1/2022",
			task_description: "",
			status: 1,
			type: "Academic",
		},
		{
			id: 3,
			task_name: "Smart Goal",
			due_date: "1/1/2022",
			task_description: "",
			status: -1,
			type: "Boomerang",
		},
		{
			id: 1,
			task_name: "Math",
			due_date: "1/3/2022",
			task_description: "",
			status: 2,
			type: "Academic",
		},
		{
			id: 2,
			task_name: "Math",
			due_date: "1/1/2022",
			task_description: "",
			status: 1,
			type: "Academic",
		},
		{
			id: 3,
			task_name: "Smart Goal",
			due_date: "1/1/2022",
			task_description: "",
			status: -1,
			type: "Boomerang",
		},
		{
			id: 1,
			task_name: "Math",
			due_date: "1/3/2022",
			task_description: "",
			status: 2,
			type: "Academic",
		},
		{
			id: 2,
			task_name: "Math",
			due_date: "1/1/2022",
			task_description: "",
			status: 1,
			type: "Academic",
		},
		{
			id: 3,
			task_name: "Smart Goal",
			due_date: "1/1/2022",
			task_description: "",
			status: -1,
			type: "Boomerang",
		},
	]);

	return (
		<div className={DashboardStyles.studentDash}>
			<h2 style={{marginLeft: 9}}className={DashboardStyles.title}>My Tasks</h2>
			<div className={DashboardStyles.tasklist}>
				<div>
					<h3 className={DashboardStyles.subtitle}>Academic</h3>
					{tasks.map((task) =>
						task.type == "Academic" ? (
							<Task
								id={task.id}
								task_name={task.task_name}
								due_date={task.due_date}
								task_description={task.task_description}
								status={task.status}
							/>
						) : null
					)}
					<h3 className={DashboardStyles.subtitle}>Boomerang</h3>
					{tasks.map((task) =>
						task.type == "Boomerang" ? (
							<Task
								id={task.id}
								task_name={task.task_name}
								due_date={task.due_date}
								task_description={task.task_description}
								status={task.status}
							/>
						) : null
					)}
				</div>
			</div>
		</div>
	);
}

export default tasklist;
