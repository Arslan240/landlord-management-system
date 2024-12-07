import React from "react"

const FormWrapper = ({ children, width = "400px" }) => {
  const formWidth = `max-w-[${width}]`
  return (
    <div className={`${formWidth} mx-auto`}>
      <div className="bg-primary-lightest px-7 py-5 sm:py-7 rounded-lg">{children}</div>
    </div>
  )
}

export default FormWrapper
