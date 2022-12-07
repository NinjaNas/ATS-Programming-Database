import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";
import { useRouter } from "next/router";
//Component that graphs Smart Goal Completion//
function smartGoal({ completedSm }) {
	const [tasks, setTasks] = useState([]);
	const router = useRouter();
	//Call api to get all tasks//
	const allTasks = () => {
		Axios.get("/api/session/task/read")
			.then((response) => {
				setTasks(response.data);
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 401) {
					router.push("/app/login");
				}
			});
	};

	let completedSM = 0;
	let totalSM = 0;

	//Map through tasks and count the completion number//
	{
		tasks.map((task) =>
			task.task_type == 3
				? task.status == 3
					? (totalSM++, completedSM++)
					: totalSM++
				: null
		);
	}
	let completePerc = (completedSM / totalSM) * 100;
	let smData = [
		{ datapoint: "Completed", SMART_Goals: completedSM },
		{ datapoint: "Total", SMART_Goals: totalSM },
	];

	completedSm(completePerc);
	useEffect(() => {
		allTasks();
	}, []);

	return (
    //Use Barchart and give its respective attributes//
		<BarChart
			data={smData}
			dataKey={"datapoint"}
			barKey={"SMART_Goals"}></BarChart>
	);
}

export default smartGoal;
