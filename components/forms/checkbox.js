import LoginStyles from "../../styles/Login.module.css"
import { useState} from "react"

const CheckBox = ({label, ref, passedValue, passedOptions}) => {
  const [options, setOptions] = useState(passedOptions)
  const [value, setValue] = useState(passedValue)



  console.log(passedOptions)
  return (
    <div>
      <label>{label}</label>
      {/* <select ref={ref} value ={passedValue} className={LoginStyles.input} components={ */}
      {
        Object.entries(options).map(([k, v]) => {
          console.log(value)
          return  (<>
            <input type="checkbox" id={v} value={k} defaultChecked={value[k]==1}/>
            <label for="vehicle1"> {v} </label>

            </>)
           
        }
      
        )
           
      }

    </div>
  )
}

export default CheckBox
