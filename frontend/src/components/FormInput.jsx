import { forwardRef } from "react"

const FormInput = forwardRef(
  ({ label, type, placeholder, name, disabled, rightLabel, dropdown = false, flexChild = false, small, labelIcon, error, ...rest }, ref) => {
    const padding = !dropdown ? `p-[0.6rem]` : `p-4`
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
