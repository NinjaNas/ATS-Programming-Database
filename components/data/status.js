import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "./barChart";
import DashboardStyles from "../../styles/Dashboard.module.css";

function status() {
	const [sessions, setSessions] = useState([]);
	const allSessions = () => {
		Axios.get("http://localhost:3000/api/session").then((response) => {
			setSessions(response.data);
		});
	};

	let unsuccesful = 10;
	let satisfactory = 5;
	let succesful = 3;
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
		{ status: "unsuccesful", uv: unsuccesful },
		{ status: "satisfactory", uv: satisfactory },
		{ status: "succesful", uv: succesful },
	];

	useEffect(() => {
		allSessions();
	}, []);

	return  <BarChart data={statusData}></BarChart>;
		/* <table>
				<tbody>
					<tr>
						<th>Unsuccesful</th>
						<th>Satisfactory</th>
						<th>Succesful</th>
					</tr>
					<tr>
						<td>{unsuccesful}</td>
						<td>{satisfactory}</td>
						<td>{succesful}</td>
					</tr>
				</tbody>
			</table> */
	
}

export default status;
