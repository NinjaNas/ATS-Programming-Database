import React, { useState, useEffect } from "react";
import BarChart from "../barChart";
import Axios from "axios";
import PieChart from "../pieChart";

function returning() {
	const [sessions, setSessions] = useState([]);
	const allSessions = () => {
		Axios.get("http://localhost:3000/api/session").then((response) => {
			setSessions(response.data);
		});
	};

	const session_count = {};
	{
		sessions.map((session) =>
			session_count[session.user_id]
				? session_count[session.user_id]++
				: (session_count[session.user_id] = 1)
		);
	}

	let retStudent = 0;
    let totalStudents = 0;

   
	{

		Object.entries(session_count).map(([k, v]) =>{
            if (v > 1) {
                retStudent++;
            }
            totalStudents++;
        })
	}

	let retStudentData = [
		{ datapoint: "Returning", Returning_Students: retStudent },
        { datapoint: "Total Students", Returning_Students: totalStudents },
	];

	useEffect(() => {
		allSessions();
	}, []);

	return (

		<BarChart
			data={retStudentData}
			dataKey={"datapoint"}
			barKey={"Returning_Students"}></BarChart>
	);
}

export default returning;
