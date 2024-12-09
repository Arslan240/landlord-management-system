import axios from "axios"
import { store } from "../redux/store"
import { logout } from "../redux/userSlice"
import { toast } from "react-toastify"

/**
 * @baseURL http://localhost:4000/api/v1/
 */
const customFetch = axios.create({
  baseURL: `http://localhost:4000/api/v1/`,
  withCredentials: true,
})

customFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // toast.error("Session Expired. Please login again")
      toast.error(error.response.data) //server error
      store.dispatch(logout())
      window.location.href("/login")
    }
    throw error
  }
)
export default customFetch
