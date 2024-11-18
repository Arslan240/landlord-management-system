import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

// selectedFilters are part of key for react query.
// so they only update when some values from filters are selected
const DEFAULTPAGE = 1
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
  page: DEFAULTPAGE,
}

const propertySlice = createSlice({
  name: "properties",
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      state.page = DEFAULTPAGE
    },
    setFilters: (state, action) => {
      const { name, ...rest } = action.payload //it can receive only min, and both min and max as well, server handles it.

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
      state.page = DEFAULTPAGE
      console.log(action.payload)
    },
    // figure out a way, how to maintain selected value state when a new request is made. maybe before storing filters, check if selected value is present then use that. And based on that update styles properly.
    setServerFilters: (state, action) => {
      state.serverFilters = action.payload
    },
    resetFilters: (state, action) => {
      state.selectedFilters = {}
      state.page = DEFAULTPAGE // page is in state so it's added to url params, on new filters, page should be 1 to get all data.
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { setFilters, setServerFilters, resetFilters, setSearchTerm, setPage } = propertySlice.actions

export const usePropertyState = () => useSelector((state) => state.propertyState)

export default propertySlice.reducer
