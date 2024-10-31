const FormInput = ({ label, type, placeholder, disabled, rightLabel, ...rest }) => {
  return (
    <>
      <div className="w-full my-3">
        <div className="flex justify-between items-center ">
          <label htmlFor="" className="block text-sm font-medium mb-2 ">{label}</label>
          <span className="block mb-2 text-sm text-gray-500 ">{rightLabel}</span>
        </div>
        <input type={type} id="" className="p-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-border-secondary disabled:opacity-50 disabled:pointer-events-none"
          disabled={disabled} placeholder={placeholder} {...rest} />
      </div>
    </>

  )
}
export default FormInput