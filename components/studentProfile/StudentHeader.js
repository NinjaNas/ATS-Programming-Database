import React from "react";

function StudentHeader(firstName, lastName) {
	return (
		<div>
			<h1>
				{firstName} {lastName}
			</h1>
		</div>
	);
}

export default StudentHeader;
