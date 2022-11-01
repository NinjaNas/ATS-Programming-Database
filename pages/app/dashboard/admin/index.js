//Landing Page for Boomerang Staff
import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import Navbar from "../../../../components/dashboard/navbar.js";
import Students from "../../../../components/dashboard/currentStudents";
import { useEffect } from "react";

function Admin() {
	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
			<Students />
		</div>
	);
}

export default Admin;
