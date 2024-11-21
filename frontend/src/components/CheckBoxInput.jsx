import { forwardRef } from "react"

const CheckBoxInput = forwardRef(({ label, small, name, labelIcon, defaultChecked, error, ...rest }, ref) => {
  return (
    <>
      <div className="form-control flex-row ">
        <label className="label cursor-pointer ">
          {/* <input type="checkbox" name={name} defaultChecked className={`checkbox checkbox-accent  ${small ? "checkbox-xs" : "checkbox-sm"}`} /> */}
          <input name={name} type="checkbox" className="toggle toggle-xs toggle-accent" defaultChecked={defaultChecked} ref={ref} {...rest} />
          {labelIcon && <span className="pl-2">{labelIcon}</span>}
          <span className={`pl-2 label-text ${small && "text-[0.8rem]"}`}>{label}</span>
        </label>
      </div>
      {error && <p className="text-warning py-1">{error.message}</p>}
    </>
  )
})

export default CheckBoxInput
