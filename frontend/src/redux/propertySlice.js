import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const initialState = {
  properties: undefined, //undefined: fetching,
  filters: {},
}

const propertySlice = createSlice({
  name: "properties",
  initialState: initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload
    },
    // updated setFilters
    setFilters: (state, action) => {
      const { name, value } = action.payload

      if (!name) {
        toast.error("Provide both name and value in redux")
        return
      }

      state.filters = {
        ...state.filters,
        [name]: {
          ...state.filters[name],
          value,
        },
      }
      console.log(action.payload)
    },
    // figure out a way, how to maintain selected value state when a new request is made. maybe before storing filters, check if selected value is present then use that. And based on that update styles properly.
    setServerFilters: (state, action) => {
      console.log("state before updated")

      let serverFilters = action.payload
      let newFilters = {}

      Object.keys(serverFilters).forEach((key) => {
        const singleFilter = serverFilters[key]
        const { name } = singleFilter
        const prevSelect = state.filters[name]?.selectedValue || 10
        newFilters[name] = {
          selectedValue: prevSelect === "" ? "" : prevSelect,
          ...singleFilter,
        }
      })
      console.log(newFilters)
      state.filters = newFilters
    },
    setServerFiltersAndProperties: (state, action) => {
      state.properties = action.payload.properties
      state.filters = action.payload.filters
    },
  },
})

export const { setProperties, setFilters, setServerFilters, setServerFiltersAndProperties } = propertySlice.actions

export const usePropertyState = () => useSelector((state) => state.propertyState)

export default propertySlice.reducer
