import React from "react";
import pageStyles from "../../../styles/Data.module.css";
import Navbar from "../../../components/dashboard/adminNav.js";
import Footer from "../../../components/dashboard/footer.js";
import Session from "../../../components/data/completion/status";
import SmartG from "../../../components/data/completion/smartGoal";

function summary() {
	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>

			<div
				style={{ display: "inline-block" }}
				className={pageStyles.dataContainer}>
				<h2 className={pageStyles.title}>Completion Status</h2>
				<Session></Session>
			</div>
			<div
				style={{ display: "inline-block" }}
				className={pageStyles.dataContainer}>
					<h2 className={pageStyles.title}>SMART Goal Completion</h2>
				<SmartG></SmartG>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default summary;
