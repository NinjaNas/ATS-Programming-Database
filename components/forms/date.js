import React from "react"
import { useState } from "react"
const DateForm = React.forwardRef(({label,  passedValue}, ref ) => {
  // const [value, setValue] = useState(passedValue)



  return (
    <div>
      <label>{label}{": "}</label>
      <input type="date" ref={ref} defaultValue={(new Date(passedValue)).toLocaleDateString('en-CA')}></input>
    </div>
  )
})

export default DateForm
