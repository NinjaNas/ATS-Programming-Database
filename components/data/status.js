import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "./barChart";
import DashboardStyles from "../../styles/Dashboard.module.css";

function status({ name, xLabel }) {
	const [sessions, setSessions] = useState([]);
	const allSessions = () => {
		Axios.get("http://localhost:3000/api/session").then((response) => {
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

	let statusData = [
		{ datapoint: "unsuccesful", Status: unsuccesful },
		{ datapoint: "satisfactory", Status: satisfactory },
		{ datapoint: "succesful", Status: succesful },
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
