import React, { createContext, useContext, useState } from "react"
import Dropdown from "./Dropdown"
import { usePropertyState } from "../redux/propertySlice"
import { Bath, Bed, CarFront, Filter } from "lucide-react"
import { useDispatch } from "react-redux"

const FiltersContext = createContext()

const Filters = React.memo(({ serverFilters = [], resetFilters }) => {
  const dispatch = useDispatch()
  const sortedFilters = Object.values(serverFilters).sort((a, b) => a.index - b.index)
  const [isReset, setIsReset] = useState(false)
  console.log("Filters rendered", sortedFilters)

  const handleResetFilters = () => {
    if (isReset) return
    dispatch(resetFilters())
    setIsReset(true)
    console.log("reset filters")
  }

  return (
    <FiltersContext.Provider value={{ serverFilters, isReset, setIsReset }}>
      <div className="py-3 md:py-0 flex flex-wrap text-primary items-center gap-[0.1rem] ">
        {sortedFilters.map((filter, index) => {
          let { name } = filter
          return <SingleFilter name={name} key={`${name}${index}`} />
        })}
        <button className="btn btn-warning h-8 min-h-8 text-white text-sm" onClick={handleResetFilters}>
          Reset
        </button>
      </div>
    </FiltersContext.Provider>
  )
})
export default Filters

Filters.whyDidYouRender = true

const SingleFilter = ({ name }) => {
  const { serverFilters, isReset, setIsReset } = useFiltersContext()
  const [selected, setSelected] = useState(false)
  const { min, max } = serverFilters[name]

  const icon = getIcon(name)
  // if a value is selected then change border color to primary ligh and background to lightest to show that this filter is being used.

  return (
    <div className={`dropdown dropdown-end `}>
      <div
        tabIndex={0}
        role="button"
        className={`btn rounded-full hover:bg-primary-hover hover:text-secondary-bright m-1 h-7 min-h-7 font-medium ${
          selected && "border-secondary-bright text-secondary-bright bg-secondary-light"
        }`}
      >
        {icon && <span>{icon}</span>}
        <span>{name}</span>
        <span className={`${!selected && "hidden"} badge p-1 h-1 bg-indigo-800 absolute top-0 right-2`}></span>
      </div>
      <Dropdown name={name} min={min} max={max} selected={selected} setSelected={setSelected} isReset={isReset} setIsReset={setIsReset} />
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
