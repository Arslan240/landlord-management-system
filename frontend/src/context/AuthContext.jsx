import { createContext, useContext } from "react";

const Context = createContext(null)

const AuthContext = ({children}) => {

  const loginUser = (userData) => {

  }

  const logoutUser = () => {
    
  }

  return (
    <Context.Provider value={[loginUser, logoutUser]} >
      {children}
    </Context.Provider>
  )
}
export default AuthContext

export const useAuth = () => useContext(Context)