import React, { useState, useEffect } from "react";
import BarChart from "../barChart";
import Axios from "axios";
import { useRouter } from "next/router";
//Component that graphs number of returning students
function returning() {
	const [sessions, setSessions] = useState([]);
	const router = useRouter();
	//Call to API to get all sessions
	const allSessions = () => {
		Axios.get("/api/session")
			.then((response) => {
				setSessions(response.data);
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 401) {
					router.push("/app/login");
				}
			});
	};

	const session_count = {};
	/*Map through all sessions and check their user id. When session_cunt[id] exists,
    add 1 to the value associated to that id*/
	{
		sessions.map((session) =>
			session_count[session.user_id]
				? session_count[session.user_id]++
				: (session_count[session.user_id] = 1)
		);
	}

	let retStudent = 0;
	let totalStudents = 0;
	/*Map through session_count. When the value associated with an id is more than 1,
    we found a returning student*/
	{
		Object.entries(session_count).map(([k, v]) => {
			if (v > 1) {
				retStudent++;
			}
			totalStudents++;
		});
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
