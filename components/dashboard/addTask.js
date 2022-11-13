import React from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";

function addTask() {
	return (
		<div style={{ display: "inline-block" }}>
			<form>
				<h2 className={DashboardStyles.title}>New Task</h2>
				<label
					style={{ display: "block" }}
					className={DashboardStyles.subtitle}>
					Task Name
				</label>
				<input
					type='text'
					name='task_name'></input>

				<label
					style={{ display: "block" }}
					className={DashboardStyles.subtitle}>
					Type
				</label>

				<input
					list='type'
					type='text'
					name='type'></input>
				<datalist id='type'>
					<option value='Boomerang' />
					<option value='Academic' />
					<option value='SMART Goal' />
					<option value='Schoolwork Plan' />
					<option value='Ecomap' />
					<option value='Tree Plan' />
				</datalist>

				<label
					style={{ display: "block" }}
					className={DashboardStyles.subtitle}>
					Due Date
				</label>
				<input
					type='text'
					name='task_name'></input>
				<button
					style={{ display: "block" }}
					className={DashboardStyles.text}>
					Add Task
				</button>
			</form>
		</div>
	);
}

export default addTask;
