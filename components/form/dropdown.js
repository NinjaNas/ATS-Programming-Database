import LoginStyles from "../../styles/Login.module.css"
import { useState} from "react"

const Dropdown = ({label, ref, passedValue, passedOptions}) => {
  const [options, setOptions] = useState(passedOptions)
  const [value, setValue] = useState(passedValue)


  console.log(passedOptions)
  return (
    <div>
      <label>{label}</label>
      {/* <select ref={ref} value ={passedValue} className={LoginStyles.input} components={ */}
      <select defaultValue={value}>{
        Object.entries(options).map(([k, v]) => 
           (<option value={k} >{v}</option>)
      )}</select>

    </div>
  )
}

export default Dropdown
