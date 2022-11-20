import Axios from "axios";
import React, { useState, useEffect } from "react";
import BarChart from "../barChart";

function selHrs() {
	const [days, setDays] = useState([]);
	const allDays = () => {
		Axios.get("http://localhost:3000/api/session/day/read").then((response) => {
			setDays(response.data);
		});
	};

	useEffect(() => {
		allDays();
	}, []);

	let hours = 0;
	days.map((attended) => (attended.status == 1 ? hours++ : null));
	let selHours = 2 * hours;

	let programData = [
		{ datapoint: "SEL Hours", Hours_Completed: selHours },
		{ datapoint: "Program Days", Hours_Completed: hours },
	];

	return <BarChart
		data={programData}
		dataKey={"datapoint"}
		barKey={"Hours_Completed"}></BarChart>;
}

export default selHrs;
