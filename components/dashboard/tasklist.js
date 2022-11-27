import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Task from "./task.js";
import DashboardStyles from "../../styles/Dashboard.module.css";

function tasklist({ session_id, type, title }) {
	const [tasks, setTasks] = useState([]);

	const allTasks = () => {
		// Grab current session id for user to render tasks
		Axios.get("/api/sessionData", {
			params: { query: session_id },
		})
			.then((res) => {
				const session_id = res.data.id;
				console.log(res.data.id);
				Axios.get("/api/session/task/read", {
					params: { key: 0, tag: session_id },
				})
					.then((response) => {
						setTasks(response.data);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	/*UseEffect calls allStudents on page Mount only*/
	useEffect(() => {
		allTasks();
	}, []);
	return (
		<div style={{display:"inline-block"}} className={DashboardStyles.taskBox} >
			<h2
				style={{ marginLeft: 9, marginTop: 0 }}
				className={DashboardStyles.title}>
				{title}
			</h2>

			<div className={ type == "admin"? DashboardStyles.taskpageAdmin: DashboardStyles.tasklist}>
				{tasks.map((task) =>
					title === "Academic" && task.task_type == 2 ? (
						<Task
							id={task.id}
							task_name={task.task_name}
							due_date={task.due_date}
							task_description={task.task_description}
							status={task.status}
						/>
					) : title === "Boomerang" && task.task_type != 2 ? (
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
		// <div className={DashboardStyles.taskBox}>
		//   <h2 style={{ marginLeft: 9 }} className={DashboardStyles.title}>
		//     My Tasks
		//   </h2>
		//   <div
		//     className={
		//       type == "admin"
		//         ? DashboardStyles.tasklistAdmin
		//         : DashboardStyles.tasklist
		//     }
		//   >
		//     <div>
		//       <h3 className={DashboardStyles.subtitle}>Academic</h3>
		//       {tasks.map((task) =>
		//         task.task_type == 2 ? (
		//           <Task
		//             id={task.id}
		//             task_name={task.task_name}
		//             due_date={new Date(task.due_date).toLocaleDateString()}
		//             task_description={task.task_description}
		//             status={task.status}
		//           />
		//         ) : null
		//       )}
		//       <h3 className={DashboardStyles.subtitle}>Boomerang</h3>
		//       {tasks.map((task) =>
		//         task.task_type != 2 ? (
		//           <Task
		//             id={task.id}
		//             task_name={task.task_name}
		//             due_date={new Date(task.due_date).toLocaleDateString()}
		//             task_description={task.task_description}
		//             status={task.status}
		//           />
		//         ) : null
		//       )}
		//     </div>
		//   </div>
		// </div>
	);
}

export default tasklist;
