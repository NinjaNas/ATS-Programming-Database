//Landing Page for Boomerang Staff
import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import Navbar from "../../../../components/dashboard/adminNav.js";
import Students from "../../../../components/dashboard/currentStudents";
import Footer from "../../../../components/dashboard/footer.js";
import { useEffect } from "react";

function Admin() {
	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
			<Students />
			<Footer></Footer>
		</div>
	);
}

export default Admin;
