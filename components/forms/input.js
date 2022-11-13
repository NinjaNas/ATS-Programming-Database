import LoginStyles from "../../styles/Login.module.css"
import { useState
  
 } from "react"
const InputForm = ({label, ref, passedValue}) => {
  const [value, setValue] = useState(passedValue)



  return (
    <div>
      <label>{label}</label>
      <input ref={ref} defaultValue={value}></input>
    </div>
  )
}

export default InputForm
