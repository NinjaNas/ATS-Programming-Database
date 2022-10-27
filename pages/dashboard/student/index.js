//Landing Page for Boomerang Student
import React from "react";
import Link from "next/link";
import Axios from "axios";
import styles from "../../../styles/Dashboard.module.css";

function Student() {
	return (
		<div>
			<nav className={styles.mainPage}>
				<Link href='./tasklist'>
					<a title='Tasklist'>Tasks</a>
				</Link>
				<Link href='./calendar'>
					<a title='calender'>Calender</a>
				</Link>
				<Link href='./questionnaire'>
					<a title='questionnaire'>Questionare</a>
				</Link>
			</nav>
		</div>
	);
}

export default Student;
