import React from "react"
import { useState } from "react"
const TimeForm = React.forwardRef(({label,  passedValue}, ref ) => {
  // const [value, setValue] = useState(passedValue)



  return (
    <div>
      <label>{label}{": "}</label>
      <input type="time" ref={ref}
      defaultValue={passedValue}
       ></input>
    </div>
  )
})

export default TimeForm
