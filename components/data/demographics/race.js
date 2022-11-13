import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

function race() {
	const [demographics, setDemographics] = useState([]);
	const allDemographics = () => {
		Axios.get("http://localhost:3000/api/demographics").then((response) => {
			setDemographics(response.data);
		});
	};

	let africanAmerican = 0;
	let americanIndian = 0;
	let asian = 0;
	let pacIslander = 0;
	let white = 0;
	let other = 0;

	demographics.map((demographic) =>
		demographic.race_bl == 1
			? africanAmerican++
			: demographic.race_ai == 1
			? americanIndian++
			: demographic.race_as == 1
			? asian++
			: demographic.race_nhpi == 1
			? pacIslander++
			: demographic.race_wh == 1
			? white++
			: demographic.race_other == 1
			? other++
			: null
	);

	useEffect(() => {
		allDemographics();
	}, []);

	return (
		<>
			<table>
				<tbody>
					<tr>
						<th>African American</th>
						<th>American Indian</th>
						<th>Asian</th>
						<th>Native Hawaiian/Pacific Islander</th>
						<th>White</th>
						<th>Other</th>
					</tr>
					<tr>
						<td>{africanAmerican}</td>
						<td>{americanIndian}</td>
						<td>{asian}</td>
						<td>{pacIslander}</td>
						<td>{white}</td>
						<td>{other}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default race;
