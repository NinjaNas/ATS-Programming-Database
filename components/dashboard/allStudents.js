import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";
import ProgressBar from "./progressBar.js";

function allStudents() {
	/*Creat state to load student data*/
	const [students, setStudents] = useState([]);
	/*Axios call to get student data*/
	const everyStudent = () => {
		Axios.get("http://localhost:3000/api/user").then((response) => {
			setStudents(response.data);
		});
	};
	/*UseEffect calls allStudents on page Mount only*/
	useEffect(() => {
		everyStudent();
	}, []);

	return (
		<div className={DashboardStyles.currentStud}>
			<h3 className={DashboardStyles.title}>All Students</h3>
			<table className={DashboardStyles.subtitle}>
				<tbody>
					<tr>
						<th></th>
						<th></th>
					</tr>
					{students.map((student) => (
						<>
							<tr>
								<td>
									<a
										href={`/app/dashboard/admin/studentprofile/${student.id}`}
										className={DashboardStyles.subtitle}>
										{student.first_name}
									</a>
								</td>
								<td className={DashboardStyles.tdNames}>
									<a
										href={`/app/dashboard/admin/studentprofile/${student.id}`}
										className={DashboardStyles.subtitle}>
										{student.last_name}
									</a>
								</td>
							</tr>
						</>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default allStudents;
