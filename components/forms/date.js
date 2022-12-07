import React from "react";
import Input from "../../styles/Forms.module.css";

// React.forwardRef allows this component to provide the reference info to the parent calling it
const DateForm = React.forwardRef(({ label, passedValue }, ref) => {
  return (
    <div>
      <label>
        {label}
        {": "}
      </label>
      <input
        className={Input.input2}
        type="date"
        ref={ref}
        defaultValue={new Date(passedValue).toLocaleDateString("en-CA")}
      ></input>
    </div>
  );
});

export default DateForm;
