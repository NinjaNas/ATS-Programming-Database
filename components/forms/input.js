import LoginStyles from "../../styles/Login.module.css";
import React, { useState } from "react";

const InputForm = React.forwardRef(({ label, passedValue }, ref) => {

  return (
    <div>
      <label>{label}{": "}</label>
      <input ref={ref} defaultValue={passedValue}></input>
    </div>
  );
});

export default InputForm;
