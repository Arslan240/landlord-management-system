import { forwardRef } from "react"

export const SelectInput = forwardRef(
  ({ label, name, rightLabel, options, padding, small, flexChild = false, defaultValue, error, ...rest }, ref) => {
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
        <select
          className={`p-[0.6rem] select select-bordered w-full max-w-[500px] ${small && "select-sm text-[0.8rem]"}`}
          name={name}
          s
          ref={ref}
          {...rest}
        >
          <option disabled value={null}>
            Pick one
          </option>
          {options.map(({ option, value }, index) => {
            console.log(option, value)
            return (
              <option className="capitalize" key={index} value={value}>
                {option}
              </option>
            )
          })}
        </select>
        {error && <p className="text-warning py-1">{error.message}</p>}
      </div>
    )
  }
)
