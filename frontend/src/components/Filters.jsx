import React, { createContext, useContext, useState } from "react"
import Dropdown from "./Dropdown"
import { usePropertyState } from "../redux/propertySlice"
import { Bath, Bed, CarFront, Filter } from "lucide-react"

const FiltersContext = createContext()

const Filters = React.memo(({ serverFilters = [] }) => {
  const sortedFilters = Object.values(serverFilters).sort((a, b) => a.index - b.index)
  console.log("Filters rendered", sortedFilters)

  return (
    <FiltersContext.Provider value={serverFilters}>
      <div className="py-3 md:py-0 flex flex-wrap text-primary items-center gap-[0.1rem] ">
        {sortedFilters.map((filter, index) => {
          let { name } = filter
          return <SingleFilter name={name} key={`${name}${index}`} />
        })}
      </div>
    </FiltersContext.Provider>
  )
})
export default Filters

Filters.whyDidYouRender = true

const SingleFilter = ({ name }) => {
  const serverFilters = useFiltersContext()
  const { min, max } = serverFilters[name]

  const icon = getIcon(name)
  // if a value is selected then change border color to primary ligh and background to lightest to show that this filter is being used.

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn rounded-full hover:bg-primary-hover m-1 h-7 min-h-7 font-medium">
        {icon && <span>{icon}</span>}
        <span>{name}</span>
      </div>
      <Dropdown name={name} min={min} max={max} />
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

export const useFiltersContext = () => useContext(FiltersContext)
