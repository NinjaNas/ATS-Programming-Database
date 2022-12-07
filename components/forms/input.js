import Input from "../../styles/Forms.module.css";
import React, { useState } from "react";

// React.forwardRef allows this component to provide the reference info to the parent calling it
const InputForm = React.forwardRef(({ label, passedValue }, ref) => {

  return (
    <div>
      <label>{label}{": "}</label>
      <input className={Input.input2}ref={ref} defaultValue={passedValue}></input>
    </div>
  );
});

export default InputForm;
