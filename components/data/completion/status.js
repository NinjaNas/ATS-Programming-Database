import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";

function status({ name, xLabel }) {
	const [sessions, setSessions] = useState([]);
	const allSessions = () => {
		Axios.get("/api/session").then((response) => {
			setSessions(response.data);
		});
	};

	let unsuccesful = 0;
	let satisfactory = 0;
	let succesful = 0;

	{
		sessions.map((session) =>
			session.status == 1
				? unsuccesful++
				: session.status == 2
				? satisfactory++
				: session.status == 3
				? succesful++
				: null
		);
	}
	let all = unsuccesful + satisfactory + succesful;
	let statusData = [
		{ datapoint: "Unsuccesful", Status: unsuccesful },
		{ datapoint: "Satisfactory", Status: satisfactory },
		{ datapoint: "Succesful", Status: succesful },
		{ datapoint: "Total", Status: all },
	];

	useEffect(() => {
		allSessions();
	}, []);

	return (
		<BarChart
			data={statusData}
			dataKey={"datapoint"}
			barKey={"Status"}></BarChart>
	);
}

export default status;
