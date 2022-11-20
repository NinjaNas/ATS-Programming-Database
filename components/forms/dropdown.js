import LoginStyles from "../../styles/Login.module.css";
import React, { useState } from "react";

const Dropdown = React.forwardRef(
  ({ label, passedValue, passedOptions, onChange}, ref) => {
    const [options, setOptions] = useState(passedOptions);
    const [value, setValue] = useState(passedValue);

    // console.log(passedOptions);
    return (
      <div>
        <label>{label}</label>
        <select ref={ref} defaultValue={value} onChange={onChange}>
          {Object.entries(options).map(([k, v]) => (
            <option value={k} key={k}>{v}</option>
          ))}
        </select>
      </div>
    );
  }
);

export default Dropdown;
