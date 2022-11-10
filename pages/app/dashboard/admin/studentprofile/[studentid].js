//Landing Page for Boomerang Staff
import React from "react";
import pageStyles from "../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
import Student from "../../../../../components/studentProfile/StudentHeader";
import Footer from "../../../../../components/dashboard/footer.js";
import { useRouter } from "next/router";
import Axios from "axios";

import { useState, useEffect } from "react";

function StudentProfile() {
	const [student, setStudent] = useState([]);
	const router = useRouter();
	const { studentid } = router.query;

	const studentInfo = () => {
		Axios.get("http://localhost:3000/api/user")
			.then((response) => {
				setStudent(response.data);
				console.log(response);
			})
			.then(() => {
				setStudent(student.filter((s) => s.id == studentid));
			});
	};

	useEffect(() => {
		studentInfo();
	}, []);

	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>

			<p>Post: {studentid}</p>
			{student.map((s) => (
				<p>{s.first_name}</p>
			))}
			<Footer></Footer>
		</div>
	);
}

export default StudentProfile;
