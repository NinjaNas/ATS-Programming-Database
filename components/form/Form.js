import LoginStyles from "../../styles/Login.module.css"
import Field from "./Field"

const Form = ({action, method, fields}) => {
  return (
    <form className={LoginStyles.input_container} action={action} method={method}>
    {fields.map(field => (
      <Field tag={field.tag} type={field.type} name={field.name} description={field.description}/>
    ))}
  </form>
  )
}

export default Form
