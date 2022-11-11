import React from "react";
import ProgBarStyles from "../../styles/ProgressBar.module.css";

const ProgressBar = (props) => {
	const { completed } = props;

	const fillerStyles = {
		height: "100%",
		width: `${completed}%`,
		backgroundColor: "#e6b566",
		borderRadius: "inherit",
		textAlign: "right",
	};

	return (
		<div className={ProgBarStyles.containerStyles}>
			<div style={fillerStyles}>
				<span className={ProgBarStyles.labelStyles}>{`${completed}%`}</span>
			</div>
		</div>
	);
};

export default ProgressBar;
