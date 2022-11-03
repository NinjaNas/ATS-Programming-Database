import LoginStyles from "../../styles/Login.module.css"

const Field = ({ tag, type, name, description}) => {
  const textField = (fieldType) => 
    fieldType === "text" || 
    fieldType === "email" ||
    fieldType === "password"
  

  const submitType = (fieldType) =>
    fieldType === "submit"

  return (
    <>
      {tag === "input" && textField(type)  && (<>
        <label className={LoginStyles.placeholder}>{description}</label>
        <input
          className={LoginStyles.input}
          name={name}
          type={type}
        />
      </>)
      }
      {tag === "input" && submitType(type) && (<>
        <input
          type={type}
          value={description}
					className={LoginStyles.submit}
						// onClick={login}
						/>
						
      </>)
      }
    </>
  )
}

export default Field
