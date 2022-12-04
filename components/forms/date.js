import React from "react"
import Input from "../../styles/Forms.module.css";
const DateForm = React.forwardRef(({label,  passedValue}, ref ) => {
  // const [value, setValue] = useState(passedValue)



  return (
    <div>
      <label>{label}{": "}</label>
      <input  className={Input.input2} type="date" ref={ref} defaultValue={(new Date(passedValue)).toLocaleDateString('en-CA')}></input>
    </div>
  )
})

export default DateForm
