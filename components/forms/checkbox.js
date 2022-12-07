
import React from "react";

// React.forwardRef allows this component to provide the reference info to the parent calling it 
const CheckBox = React.forwardRef(
  ({ label, passedValue, onChange}, ref) => {
    return (
      <>
        <input 
          ref={ref}
          type="checkbox"
          id={`Checkbox-${label}`}
          defaultChecked={passedValue == 1}
          onChange={onChange}
        />
        <label htmlFor={`Checkbox-${label}`}> {label}{": "} </label>
      </>
    );
  }
);

export default CheckBox;
