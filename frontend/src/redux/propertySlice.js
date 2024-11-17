import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

// selectedFilters are part of key for react query.
// so they only update when some values from filters are selected

const initialState = {
  serverFilters: {
    rent: { index: 0, name: "rent" },
    sqft: { index: 1, name: "sqft" },
    beds: { index: 2, name: "beds" },
    baths: { index: 3, name: "baths" },
    year: { index: 4, name: "year" },
    garage: { index: 5, name: "garage" },
  },
  selectedFilters: {},
  searchTerm: "",
  page: 1,
}

const propertySlice = createSlice({
  name: "properties",
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    // updated setFilters
    setFilters: (state, action) => {
      const { name, ...rest } = action.payload //it'll receive min and max value, it might need to be changed later. if max is undefined from action.payload, then delete it from the state.selectedFilters[name]. if max is present then min and max both should be present. just pass them along using rest.

      if (!name) {
        toast.error("Provide both name and value in redux")
        return
      }

      state.selectedFilters = {
        ...state.selectedFilters,
        [name]: {
          ...rest,
        },
      }
      console.log(action.payload)
    },
    // figure out a way, how to maintain selected value state when a new request is made. maybe before storing filters, check if selected value is present then use that. And based on that update styles properly.
    setServerFilters: (state, action) => {
      state.serverFilters = action.payload
    },
    resetFilters: (state, action) => {
      state.selectedFilters = {}
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { setFilters, setServerFilters, resetFilters, setSearchTerm, setPage } = propertySlice.actions

export const usePropertyState = () => useSelector((state) => state.propertyState)

export default propertySlice.reducer
