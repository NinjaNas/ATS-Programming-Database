import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";

function smartGoal() {
	const [tasks, setTasks] = useState([]);
	const allTasks = () => {
		Axios.get("http://localhost:3000/api/session/task/read").then(
			(response) => {
				setTasks(response.data);
			}
		);
	};

	let completedSM = 0;
	let totalSM = 0;

	{
		tasks.map((task) =>
			task.task_type == 3
				? task.status == 3
					? (totalSM++, completedSM++)
					: totalSM++
				: null
		);
	}
	let completePerc = completedSM / totalSM;
	let smData = [
		{ datapoint: "Completed", SMART_Goals: completedSM },
		{ datapoint: "Total", SMART_Goals: totalSM },
		{ datapoint: "Completion Percentage", SMART_Goals: completePerc },
	];

	useEffect(() => {
		allTasks();
	}, []);

	return (
		<BarChart
			data={smData}
			dataKey={"datapoint"}
			barKey={"SMART_Goals"}></BarChart>
	);
}

export default smartGoal;
