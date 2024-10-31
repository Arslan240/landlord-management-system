import { createContext, useContext } from "react";

const Context = createContext(null)

const AuthContext = ({children}) => {
  return (
    <Context.Provider >
      {children}
    </Context.Provider>
  )
}
export default AuthContext

export const useAuth = () => useContext(Context)