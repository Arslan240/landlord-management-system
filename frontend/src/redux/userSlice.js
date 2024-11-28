import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { getItemFromLocalStorage } from "../utils"
import { useSelector } from "react-redux"

// returned from server / saved in local storage
// const user = {
//   name,
//   id,
//   role,
//   isVerified: true/false
// }

const getInitialState = () => {
  return {
    user: getItemFromLocalStorage("user") || null,
  }
}

const userString = "user"

const initialState = getInitialState()

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action)
      state.user = { ...action.payload }
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    logout: (state, action) => {
      if (!state.user) {
        toast.error("You're not logged in.")
      }
      state.user = null
      localStorage.setItem("user", null)
    },
    register: (state, action) => {
      state.user = { ...action.payload }
      localStorage.setItem("user", JSON.stringify(state.user))
    },
  },
})

export const { login, logout, register } = userSlice.actions

export const useUserState = () => useSelector((state) => state.userState.user)

export default userSlice.reducer
