import { useState } from "react"
import Dropdown from "./Dropdown"

// find a way to render filters from array values.
// preferrabely server will send us filter values which we'll use to render filters. (server will know which unique values are present, so we'll only render those options which are actually present in the backend)
const Filters = () => {
  // fetch values of filter values
  return (
    <div className="py-3 md:py-0">
      <SingleFilter name={"price"} icon={"$"} />
      <SingleFilter name={"sqft"} icon={"m2"} />
      {/* <SingleFilter name={'beds'} />
      <SingleFilter name={'baths'} /> */}
    </div>
  )
}
export default Filters

const SingleFilter = ({ name, icon }) => {
  // if a value is selected then change border color to primary ligh and background to lightest to show that this filter is being used.

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn rounded-full hover:bg-primary-hover m-1 h-9 min-h-9">
        {icon && <span>{icon}</span>}
        <span>{name}</span>
      </div>
      <Dropdown items={["1599", "1789"]} name={name} />
    </div>
  )
}

const getIcon = (name) => {
  switch (name) {
    case "rent": {
      return "$"
    }
    case "sqft": {
      return "sqft"
    }
    case "beds": {
      return ""
    }
    case "baths": {
      return ""
    }
    default: {
      return ""
    }
  }
}
