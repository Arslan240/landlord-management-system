import React, { forwardRef } from "react"

const FormTextArea = forwardRef(({ label, rightLabel, labelIcon, name, placeholder, small, error, ...rest }, ref) => {
  return (
    <div>
      {(label || rightLabel) && (
        <div className="flex justify-between items-center ">
          <label htmlFor={`${label}-${name}`} className="block text-sm font-medium mb-1 capitalize">
            {labelIcon ? (
              <div className="flex items-center gap-1">
                {label}
                {labelIcon}
              </div>
            ) : (
              <>{label}</>
            )}
          </label>
          <span className="block mb-2 text-sm text-gray-500 ">{rightLabel}</span>
        </div>
      )}
      <textarea className={`w-full h-36 p-2 rounded-md ${small && "text-xs"}`} id={`${label}-${name}`} name={name} {...rest} ref={ref} />
      {error && <p className={`text-warning py-1 ${small && "text-xs"}`}>{error.message}</p>}
    </div>
  )
})

export default FormTextArea
