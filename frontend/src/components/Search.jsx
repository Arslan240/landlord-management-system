import { SearchIcon } from "lucide-react"
import { forwardRef } from "react"

const Search = forwardRef(({ classNames, placeholder, header = false, changeHandler }, ref) => {
  return (
    <div className={`${classNames}`}>
      <div className="relative">
        <input
          type="text"
          className={`peer py-2 px-4 ps-11 block w-full  border-transparent ${
            !header && "bg-primary-lightest"
          } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
          placeholder={placeholder}
          onChange={changeHandler}
          ref={ref}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <SearchIcon size={`${!header ? "1.1rem" : "1.3rem"}`} />
        </div>
      </div>
    </div>
  )
})
export default Search
