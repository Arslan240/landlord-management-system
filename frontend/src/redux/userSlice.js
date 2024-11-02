import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getItemFromLocalStorage } from '../utils';


const userString = 'user'

const initialState = {
  user: getItemFromLocalStorage('user') || null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user = { ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logout: (state, action) => {
      if (!state.user){
        toast.error('You\'re not logged in.')
      }
      state.user = initialState
      localStorage.setItem('user', null)
    },
    register: (state, action) => {
      state.user = {...action.payload}
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  }
})

export const { login, logout,register } = userSlice.actions

export default userSlice.reducer