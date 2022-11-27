import React from "react";
import Styles from "../../styles/Cards.module.css"

function StudentHeader({key, firstName, lastName, email}) {
	return (
		<div>
			<h1 className={Styles.studentHeader}>
				{firstName} {lastName}
			</h1>
			<h3> {email} </h3>
		</div>
	);
}

export default StudentHeader;
