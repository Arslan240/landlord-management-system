import { useDispatch } from "react-redux"
import { setFilters } from "../redux/propertySlice"

// make it reusable by passing down setFilters from parent so that we can use it with slice. if we keep the same syntax with setFilters function, we can reuse it.
const Dropdown = ({ items = [], name }) => {
  const dispatch = useDispatch()

  const handleFilter = (name, value) => {
    dispatch(setFilters({ name, value }))
  }
  return (
    <ul
      tabIndex={0}
      className=' menu dropdown-content rounded-md z-[1] w-52 p-1.5 shadow bg-primary-lightest'
    >
      {items.map((item, index) => (
        <li className='capitalize hover:bg-secondary-lightest rounded-md '>
          <a onClick={() => handleFilter(name, item)} key={`${item}${index}`}>
            {item}
          </a>
        </li>
      ))}
    </ul>
  )
}
export default Dropdown
