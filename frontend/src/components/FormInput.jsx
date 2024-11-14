import { forwardRef } from "react"

const FormInput = forwardRef(({ label, type, placeholder, disabled, rightLabel, dropdown, ...rest }, ref) => {
  const padding = dropdown ? `p-2` : `p-4`
  return (
    <>
      <div className="w-full my-3">
        <div className="flex justify-between items-center ">
          <label htmlFor="" className="block text-sm font-medium mb-2 capitalize">
            {label}
          </label>
          <span className="block mb-2 text-sm text-gray-500 ">{rightLabel}</span>
        </div>
        <input
          type={type}
          ref={ref}
          className={`${padding} block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-border-secondary disabled:opacity-50 disabled:pointer-events-none`}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </>
  )
})
export default FormInput
