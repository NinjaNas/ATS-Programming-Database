import LoginStyles from "../../styles/Login.module.css"
import { useState
  
 } from "react"
const InputForm = ({label, ref, passedValue}) => {
  const [value, setValue] = useState(passedValue)



  return (
    <div>
      <label>{label}</label>
      <input ref={ref} className={LoginStyles.input} defaultValue={value}></input>
    </div>
  )
}

export default InputForm
