
import React from "react";

const CheckBox = React.forwardRef(
  ({ label, passedValue, onChange}, ref) => {
    // console.log(passedOptions)
    return (
      <>
        <input 
          ref={ref}
          type="checkbox"
          id={`Checkbox-${label}`}
          defaultChecked={passedValue == 1}
          onChange={onChange}
        />
        <label htmlFor={`Checkbox-${label}`}> {label} </label>
      </>
    );
  }
);

export default CheckBox;
