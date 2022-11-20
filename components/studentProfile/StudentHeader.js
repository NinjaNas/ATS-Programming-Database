import React from "react";

function StudentHeader({key, firstName, lastName, email}) {
	return (
		<div>
			<h1>
				{firstName} {lastName}
			</h1>
			<h3> {email} </h3>
		</div>
	);
}

export default StudentHeader;
