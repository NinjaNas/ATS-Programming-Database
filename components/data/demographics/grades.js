import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";

function demographics() {
	const [sessions, setSessions] = useState([]);
	const allSessions = () => {
		Axios.get("/api/session").then((response) => {
			setSessions(response.data);
		});
	};

	let highschool = 0;
	let middleshcool = 0;

	{
		sessions.map((session) =>
			session.grade < 9 ? middleshcool++ : highschool++
		);
	}

	let gradesData = [
		{ datapoint: "High_School", "": highschool },
		{ datapoint: "Middle_School", "": middleshcool },
	];
	useEffect(() => {
		allSessions();
	}, []);

	return (
		<BarChart
			data={gradesData}
			dataKey={"datapoint"}
			barKey={''}></BarChart>
		// <>
		// 	<table>
		// 		<tbody>
		// 			<tr>
		// 				<th>Highschool</th>
		// 				<th>Middleschool</th>
		// 			</tr>
		// 			<tr>
		// 				<td>{highschool}</td>
		// 				<td>{middleshcool}</td>
		// 			</tr>
		// 		</tbody>
		// 	</table>
		// </>
	);
}

export default demographics;
