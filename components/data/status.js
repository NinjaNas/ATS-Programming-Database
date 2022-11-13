import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import DashboardStyles from "../../styles/Dashboard.module.css";

function status() {
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

	useEffect(() => {
		allSessions();
	}, []);

	return (
		<>
		
			<table>
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
			</table>
		
		</>
	);
}

export default status;
