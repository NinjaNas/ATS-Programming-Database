import React from "react";

function StudentHeader({key, firstName, lastName}) {
	return (
		<div>
			<h1>
				{firstName} {lastName}
			</h1>
		</div>
	);
}

export default StudentHeader;
