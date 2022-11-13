import LoginStyles from "../../styles/Login.module.css"
import { useState
  
 } from "react"
const DateForm = ({label, ref, passedValue}) => {
  const [value, setValue] = useState(passedValue)



  return (
    <div>
      <label>{label}</label>
      <input type="date" ref={ref} defaultValue={(new Date(value)).toLocaleDateString('en-CA')}></input>
    </div>
  )
}

export default DateForm
