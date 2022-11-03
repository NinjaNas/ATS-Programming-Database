import React from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";

function currentStudent({ name, progress }) {
	return (
		<div>
			<h4
				style={{ display: "inline-block" }}
				className={DashboardStyles.subtitle}>
				{name}
			</h4>
			<h4
				style={{position: "relative", left: 150, display: "inline-block" }}
				className={DashboardStyles.subtitle}>
				{progress}
			</h4>
		</div>
	);
}

export default currentStudent;
