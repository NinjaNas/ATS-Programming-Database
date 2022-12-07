import React from "react";
import Input from "../../styles/Forms.module.css";

// React.forwardRef allows this component to provide the reference info to the parent calling it
const TimeForm = React.forwardRef(({ label, passedValue }, ref) => {

	return (
		<div>
			<label>
				{label}
				{": "}
			</label>
			<input
				type='time'
				ref={ref}
				className={Input.input2}
				defaultValue={passedValue}></input>
		</div>
	);
});

export default TimeForm;
