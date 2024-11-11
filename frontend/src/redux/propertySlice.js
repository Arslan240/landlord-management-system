import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  properties: undefined, //undefined: fetching,
  filters: {}
}

const propertySlice = createSlice({
  name: 'properties',
  initialState: initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload
    },
    setFilters: (state, action) => {
      const { name, value } = action.payload
      if (!name || !value) {
        toast.error('Provide both name and value in redux')
        return
      }
      state.filters = { ...state.filters, [name]: value }
    }
  }
})

export const { setProperties, setFilters } = propertySlice.actions

export const usePropertyState = () => useSelector(state => state.propertyState)

export default propertySlice.reducer