import { SearchIcon } from "lucide-react"

const Search = ({ classNames, placeholder }) => {
  return (
    <div className={` space-y-3 ${classNames}`}>
      <div className="relative">
        <input
          type="text"
          className="peer py-3 px-4 ps-11 block w-full  border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <SearchIcon size={'1.3rem'} />
        </div>
      </div>
    </div>

  )
}
export default Search