import React from "react";
import { useState } from "react";
import CurrentStudent from "./currentStudent";
import DashboardStyles from "../../styles/Dashboard.module.css";

function currentStudents() {
	const [students, setStudents] = useState([
		{
			name: "Jose Perez",
			progress: "80%",
		},
		{
			name: "Rosio de Machado",
			progress: "90%",
		},
	]);
	return (
		<div className={DashboardStyles.currentStud}>
			<h3 className={DashboardStyles.title}>Current Students</h3>
			{students.map((student) => (
				<CurrentStudent
					name={student.name}
					progress={student.progress}
				/>
			))}
		</div>
	);
}

export default currentStudents;
