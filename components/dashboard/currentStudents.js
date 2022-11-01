import React from "react";
import { useState } from "react";
import CurrentStudent from "./currentStudent";

function currentStudents() {
	const [students, setStudents] = useState([
		{
			name: "Gabe",
			progress: "80%",
		},
		{
			name: "Elad",
			progress: "90%",
		},
	]);
	return (
		<div>
			<h3>currentStudents</h3>
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
