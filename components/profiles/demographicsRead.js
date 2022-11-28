import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import CardStyles from "../../styles/Cards.module.css";
import race from "../../constants/race";
import gender from "../../constants/gender";
import ethnicity from "../../constants/ethnicity";

function DemographicsRead({ id }) {
	const [demographics, setDemographics] = useState();
	const [genderString, setGenderString] = useState();
	const [raceString, setRaceString] = useState();
	const [display, setDisplay] = useState("none");
	const router = useRouter();

	const demographicsInfo = () => {
		Axios.get("/api/demographics/read/", { params: { key: 0, tag: id } }).then(
			(response) => {
				// setDemographics(response.data.filter(s => s.user_id == id));
				setDemographics(response.data[0]);
			}
		);
	};

	const expand = () => {
		display == "none" ? setDisplay("block") : setDisplay("none");
	};

	useEffect(() => {
		demographicsInfo();
	}, []);

	useEffect(() => {
		if (demographics) {
			setGenderString(gender[demographics.gender]);
			setRaceString(
				(() => {
					let races = [];
					Object.entries(race).forEach(([k, v]) => {
						if (demographics[k] == 1) {
							races.push(v);
						}
					});
					
					return races.join(", ");
				})()
			);
		}
	}, [demographics]);

	return (
		<div className={CardStyles.card}>
			<button
				className={CardStyles.displayLink}
				onClick={expand}>
				Demographics
			</button>
			{demographics && (
				<div style={{ display: display }}>
					<p>
						Date of Birth:{" "}
						{new Date(demographics.date_of_birth).toLocaleDateString()}
					</p>
					<p>Gender: {genderString}</p>
					{demographics.gender == 99 && (
						<p>Other Gender: {demographics.gender_other}</p>
					)}

					<p>Race: {raceString}</p>
					{demographics.race_other == 1 && (
						<p>Other Race: {demographics.race_other_specify}</p>
					)}
					<p>Ethnicity: {ethnicity[demographics.ethnicity]}</p>
					<p>Free Lunch: {demographics.free_lunch == 1 ? "Yes" : "No"}</p>

					<Link href={`/app/dashboard/admin/studentprofile/${id}/demographics`}>
						<a className={CardStyles.Link}>Edit Profile</a>
					</Link>
				</div>
			)}
		</div>
	);
}

export default DemographicsRead;
