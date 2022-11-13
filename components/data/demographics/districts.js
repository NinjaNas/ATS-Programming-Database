import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

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

	useEffect(() => {
		allSessions();
	}, []);

	return (
		<>
			<table>
				<tbody>
					<tr>
						<th>Chapel Hill-Carrboro</th>
						<th>Orange County</th>
					</tr>
					<tr>
						<td>{chapCarr}</td>
						<td>{orange}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default districts;
