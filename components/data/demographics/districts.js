import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";

function districts() {
	const [sessions, setSessions] = useState([]);
	const allSessions = () => {
		Axios.get("http://localhost:3000/api/session").then((response) => {
			setSessions(response.data);
		});
	};

	let chapCarr = 0;
	let orange = 0;

	{
		sessions.map((session) =>
			0 < session.school < 9
				? chapCarr++
				: 8 > session.school < 15
				? orange++
				: null
		);
	}

	let districtsData = [
		{ datapoint: "Chapel Hill- Carrboro", School_District: chapCarr },
		{ datapoint: "Orange", School_District: orange }
	];

	useEffect(() => {
		allSessions();
	}, []);

	

	return (
		<BarChart data={districtsData} dataKey={'datapoint'} barKey={'School_District'} ></BarChart>
	);
}

export default districts;
