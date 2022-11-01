import React from "react";

function currentStudent({ name, progress }) {
	return (
		<div>
			<h4>
				{name} - {progress}
			</h4>
		</div>
	);
}

export default currentStudent;
