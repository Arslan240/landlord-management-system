import { useState } from "react"
import Dropdown from "./Dropdown"
import { usePropertyState } from "../redux/propertySlice"
import { Bath, Bed, CarFront } from "lucide-react"

// find a way to render filters from array values.
// preferrabely server will send us filter values which we'll use to render filters. (server will know which unique values are present, so we'll only render those options which are actually present in the backend)
const Filters = () => {
  // fetch values of filter values
  const { filters } = usePropertyState()

  const sortedFilters = Object.values(filters).sort((a, b) => a.index - b.index)

  return (
    <div className="py-3 md:py-0 flex flex-wrap text-primary">
      {sortedFilters.map((filter) => {
        let { name } = filter

        return <SingleFilter name={name} icon={getIcon(name)} />
      })}
      {/* <SingleFilter name={"price"} icon={"$"} />
      <SingleFilter name={"sqft"} icon={"m2"} /> */}
      {/* <SingleFilter name={'beds'} />
      <SingleFilter name={'baths'} /> */}
    </div>
  )
}
export default Filters

const SingleFilter = ({ name, icon }) => {
  // if a value is selected then change border color to primary ligh and background to lightest to show that this filter is being used.
  // const { filters } = usePropertyState()

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn rounded-full hover:bg-primary-hover m-1 h-7 min-h-7 font-medium">
        {icon && <span>{icon}</span>}
        <span>{name}</span>
      </div>
      <Dropdown items={["1599", "1789"]} name={name} />
    </div>
  )
}

const getIcon = (name) => {
  const iconSize = "1rem"
  switch (name) {
    case "rent": {
      return "$"
    }
    case "beds": {
      return <Bed size={iconSize} />
    }
    case "baths": {
      return <Bath size={iconSize} />
    }
    case "garages": {
      return <CarFront size={iconSize} />
    }
    default: {
      return ""
    }
  }
}
