import { forwardRef } from "react"

const FormInput = forwardRef(
  ({ label, type, placeholder, name, disabled, rightLabel, dropdown = false, flexChild = false, small, labelIcon, error, ...rest }, ref) => {
    const padding = !dropdown ? `p-[0.6rem]` : `p-4`
    // console.log(error)
    return (
      <>
        <div className={`w-full ${!flexChild && "my-3"}`}>
          {(label || rightLabel) && (
            <div className="flex justify-between items-center ">
              <label htmlFor="" className="block text-sm font-medium mb-1 capitalize">
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
          {/* {type === "select" && <SelectInput options={options} padding={padding} small={small} />} */}
          <input
            name={name}
            type={type}
            ref={ref}
            className={`${padding} block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-border-secondary disabled:opacity-50 disabled:pointer-events-none ${
              error && "border-[1px] border-warning"
            } ${small && "text-[0.8rem]"}`}
            disabled={disabled}
            placeholder={placeholder}
            {...rest}
          />
          {error && <p className="text-warning py-1">{error.message}</p>}
        </div>
      </>
    )
  }
)
export default FormInput

export const SelectInput = ({ label, rightLabel, options, padding, small, flexChild = false, selected, error, ...rest }) => {
  // const padding = !dropdown ? `p-[0.6rem]` : `p-4`
  return (
    <div className={`w-full ${!flexChild && "my-3"}`}>
      {(label || rightLabel) && (
        <div className="flex justify-between items-center ">
          <label htmlFor="" className="block text-sm font-medium mb-1 capitalize">
            {label}
          </label>
          {rightLabel && <span className="block mb-2 text-sm text-gray-500 ">{rightLabel}</span>}
        </div>
      )}
      <select className={`p-[0.6rem] select select-bordered w-full ${small && "text-[0.8rem]"}`} {...rest}>
        <option disabled>Pick one</option>
        {options.map((option, index) => (
          <option className="capitalize" key={index} value={option.toLowerCase()} selected={index === selected}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-warning py-1">{error.message}</p>}
    </div>
  )
}

export const CheckBoxInput = ({ label, small, name, labelIcon, defaultChecked }) => {
  return (
    <div className="form-control flex-row ">
      <label className="label cursor-pointer ">
        {/* <input type="checkbox" name={name} defaultChecked className={`checkbox checkbox-accent  ${small ? "checkbox-xs" : "checkbox-sm"}`} /> */}
        <input name={name} type="checkbox" className="toggle toggle-xs toggle-accent" defaultChecked={defaultChecked} />
        {labelIcon && <span className="pl-2">{labelIcon}</span>}
        <span className={`pl-2 label-text ${small && "text-[0.8rem]"}`}>{label}</span>
      </label>
    </div>
  )
}
