import React from "react";
import pageStyles from "../../../styles/Dashboard.module.css";
import Navbar from "../../../components/dashboard/adminNav.js";
import Footer from "../../../components/dashboard/footer.js";

function profile() {
	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
			<div style={{ height: "90%" }}></div>
			<Footer></Footer>
		</div>
	);
}

export default profile;
