import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import DashboardStyles from "../../styles/Dashboard.module.css";

function task({ id, task_name, due_date, task_description, status }) {
	const statusDict = ["Started", "Completed", "Verified"];
	const [type, setType] = useState([]);
	const [trackedStatus, setStatus] = useState(status);
	const [checkedStudent, setCheckedStudent] = useState(trackedStatus != 1);
	const [toggleStudent, setToggleStudent] = useState(
		trackedStatus != 1 && trackedStatus != 2
	);
	const [toggleAdminIncomplete, setToggleAdminIncomplete] = useState(
		trackedStatus != 2 && trackedStatus != 3
	);

	const [toggleAdminVerify, setToggleAdminVerify] = useState(
		trackedStatus != 2
	);
	/*UseEffect calls allStudents on page Mount only*/
	useEffect(() => {
		allTasks();
	}, []);

	const allTasks = () => {
		// Grab current session id for user to render tasks
		Axios.get("/api/userData")
			.then((res) => {
				setType(res.data[0][0].type);
			})
			.catch((err) => {
				console.log(err);
			});

		Axios.get("/api/session/task/read", {
			params: { key: 2, tag: id },
		})
			.then((res) => {
				setStatus(res.data[0].status);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const studentButtonClick = () => {
		switch (trackedStatus) {
			case 1:
				Axios.post("/api/session/task/update", {
					status: 2,
					task_id: id,
				})
					.then(() => {
						setCheckedStudent(true);
						setStatus(2);
					})
					.catch((err) => {
						console.log(err);
					});
				break;
			case 2:
				Axios.post("/api/session/task/update", {
					status: 1,
					task_id: id,
				})
					.then(() => {
						setCheckedStudent(false);
						setStatus(1);
					})
					.catch((err) => {
						console.log(err);
					});
				break;
			case 3:
				// Disable checked
				setToggleStudent(true);
				setCheckedStudent(true);
				break;
			default:
				setCheckedStudent(false);
		}
	};

	const adminVerifyButtonClick = () => {
		switch (trackedStatus) {
			case 1:
				// Do nothing
				setToggleAdminVerify(true);
				break;
			case 2:
				Axios.post("/api/session/task/update", {
					status: 3,
					task_id: id,
				})
					.then(() => {
						setToggleAdminVerify(true);
						setStatus(3);
					})
					.catch((err) => {
						console.log(err);
					});
				break;
			case 3:
				setToggleAdminVerify(true);
				break;
			default:
				setToggleAdminVerify(false);
		}
	};

	const adminIncompleteButtonClick = () => {
		switch (trackedStatus) {
			case 1:
				// Do nothing
				setToggleAdminIncomplete(true);
				break;
			case 2:
				Axios.post("/api/session/task/update", {
					status: 1,
					task_id: id,
				})
					.then(() => {
						setToggleAdminIncomplete(true);
						setToggleAdminVerify(true);
						setStatus(1);
					})
					.catch((err) => {
						console.log(err);
					});
				break;
			case 3:
				Axios.post("/api/session/task/update", {
					status: 1,
					task_id: id,
				})
					.then(() => {
						setToggleAdminIncomplete(true);
						setToggleAdminVerify(true);
						setStatus(1);
					})
					.catch((err) => {
						console.log(err);
					});
				break;
			default:
				setToggleAdminIncomplete(false);
		}
	};

	// Render different for students
	if (type === "student" || type === "parent") {
		return (
			<div>
				<h4 className={DashboardStyles.taskName}>{task_name}</h4>
				<h5 className={DashboardStyles.taskRest}>
					Due: {new Date(due_date).toLocaleDateString("en-US")}
					<p>Status: {statusDict[trackedStatus - 1]}</p>
					<input
						className={DashboardStyles.checkbox}
						type='checkbox'
						checked={checkedStudent}
						onChange={studentButtonClick}
						disabled={toggleStudent}></input>
				</h5>

				{/*<h5 className={DashboardStyles.text}>
				{status > 0 ? statusDict[status] : statusDict[0]}
			</h5>*/}
			</div>
		);
	} else if (type === "admin" || type === "counselor") {
		return (
			<div>
				<h4 className={DashboardStyles.taskName}>{task_name}</h4>
				<h5 className={DashboardStyles.taskRest}>
					Due: {new Date(due_date).toLocaleDateString("en-US")}
					<p>Status: {statusDict[trackedStatus - 1]}</p>
					<input
						className={DashboardStyles.taskRest}
						type='button'
						value='Incomplete'
						onClick={adminIncompleteButtonClick}
						disabled={toggleAdminIncomplete}></input>
					<input
						className={DashboardStyles.taskRest}
						type='button'
						value='Verify'
						onClick={adminVerifyButtonClick}
						disabled={toggleAdminVerify}></input>
				</h5>

				{/*<h5 className={DashboardStyles.text}>
				{status > 0 ? statusDict[status] : statusDict[0]}
			</h5>*/}
			</div>
		);
	}
}

export default task;
