import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";
import { useRouter } from "next/router";
//Component that graphs completion status of ATS program//
function status({ name, xLabel }) {
	const [sessions, setSessions] = useState([]);
	const router = useRouter();
	//Call to API to get all sessions//
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

	let unsuccesful = 0;
	let satisfactory = 0;
	let succesful = 0;
	//Map through the sessions and count the different status//
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
	//Create a key-value data structure to pass to BarChart//
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
		//Use Barchart and key-value data structure created to graph//
		<BarChart
			data={statusData}
			dataKey={"datapoint"}
			barKey={"Status"}></BarChart>
	);
}

export default status;
