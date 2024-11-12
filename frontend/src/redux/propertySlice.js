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
      if (!name || !value) {
        toast.error("Provide both name and value in redux")
        return
      }
      state.filters = { ...state.filters, [name]: { value } }
    },
    // figure out a way, how to maintain selected value state when a new request is made. maybe before storing filters, check if selected value is present then use that. And based on that update styles properly.
    setServerFilters: (state, action) => {
      let serverFilters = action.payload
      let newFilters = {}

      Object.keys(serverFilters).forEach((key) => {
        const singleFilter = serverFilters[key]
        newFilters[singleFilter.name] = {
          selectedValue: "",
          ...singleFilter,
        }
      })
      console.log(serverFilters)
      state.filters = newFilters
    },
  },
})

export const { setProperties, setFilters, setServerFilters } = propertySlice.actions

export const usePropertyState = () => useSelector((state) => state.propertyState)

export default propertySlice.reducer
