import React from "react";
import Input from "../../styles/Forms.module.css";

const TimeForm = React.forwardRef(({ label, passedValue }, ref) => {
	// const [value, setValue] = useState(passedValue)

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
