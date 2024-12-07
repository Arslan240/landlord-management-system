import React from "react"

const FormTextArea = ({ label, name, placeholder, small, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={`${label}-${name}`}>{label}</label>
      <textarea className={`w-full h-36 p-2 ${small && "text-xs"}`} id={`${label}-${name}`} name={name} {...rest} />
      {error && <p className={`text-warning py-1 ${small && "text-xs"}`}>{error.message}</p>}
    </div>
  )
}

export default FormTextArea
