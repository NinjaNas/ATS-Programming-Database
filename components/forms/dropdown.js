import Input from "../../styles/Forms.module.css";
import React, { useState } from "react";

// React.forwardRef allows this component to provide the reference info to the parent calling it
const Dropdown = React.forwardRef(
  ({ label, passedValue, passedOptions, onChange }, ref) => {
    const [options, setOptions] = useState(passedOptions);
    const [value, setValue] = useState(passedValue);

    return (
      <div>
        <label>
          {label}
          {": "}
        </label>
        <select
          className={Input.input2}
          ref={ref}
          defaultValue={value}
          onChange={onChange}
        >
          {Object.entries(options).map(([k, v]) => (
            <option value={k} key={k}>
              {v}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Dropdown;
