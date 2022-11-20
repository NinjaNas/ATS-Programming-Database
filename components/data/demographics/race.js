import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";

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

	let raceData = [
		{ datapoint: "African-American", Race: africanAmerican },
		{ datapoint: "American-Indian", Race: americanIndian },
		{ datapoint: "Asian", Race: asian },
		{ datapoint: "Pacific-Islander", Race: pacIslander },
		{ datapoint: "White", Race: white },
		{ datapoint: "Other", Race: other }
	];
	useEffect(() => {
		allDemographics();
	}, []);

	return (
		<BarChart data={raceData} dataKey={'datapoint'} barKey={'Race'} ></BarChart>
	);
}

export default race;
