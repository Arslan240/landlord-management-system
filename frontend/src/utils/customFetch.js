import axios from "axios"

/**
 * @baseURL http://localhost:4000/api/v1/
 */
const customFetch = axios.create({
  baseURL: `http://localhost:4000/api/v1/`,
  withCredentials: true,
})

export default customFetch
