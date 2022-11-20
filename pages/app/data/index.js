import React from "react";
import pageStyles from "../../../styles/Data.module.css";
import Navbar from "../../../components/dashboard/adminNav.js";
import Footer from "../../../components/dashboard/footer.js";
import Session from "../../../components/data/status";
import BarChart from "../../../components/data/barChart";

function summary() {

	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
			<div
				style={{ display: "inline-block" }}
				className={pageStyles.dataContainer}>
				<Session></Session>
				
			</div>
			<Footer></Footer>
		</div>
	);
}

export default summary;
