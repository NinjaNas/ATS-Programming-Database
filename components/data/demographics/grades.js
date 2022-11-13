import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

function demographics() {
	const [sessions, setSessions] = useState([]);
	const allSessions = () => {
		Axios.get("http://localhost:3000/api/session").then((response) => {
			setSessions(response.data);
		});
	};

	let highschool = 0;
	let middleshcool = 0;

	{
		sessions.map((session) =>
			session.grade < 9 ? middleshcool++ : highschool++
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
						<th>Highschool</th>
						<th>Middleschool</th>
					</tr>
					<tr>
						<td>{highschool}</td>
						<td>{middleshcool}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default demographics