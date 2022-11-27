import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";

function smartGoal({completedSm}) {
	const [tasks, setTasks] = useState([]);
	const allTasks = () => {
		Axios.get("/api/session/task/read").then(
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
	let completePerc = (completedSM / totalSM)*100;
	let smData = [
		{ datapoint: "Completed", SMART_Goals: completedSM },
		{ datapoint: "Total", SMART_Goals: totalSM },
	];

    completedSm(completePerc);
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
