import { Navigate } from "react-router-dom"
import { useUserState } from "../redux/userSlice"
import { toast } from "react-toastify"
import { useEffect } from "react"

function RequireAuth(Component, redirectTo = "/login") {
  return function ProtectedComponent(props) {
    const user = useUserState()
    const isLoggedIn = user?.name ? true : false // we could also just check for user ? , but to confirm checking for user.

    useEffect(() => {
      if (!isLoggedIn) {
        toast.error("You're not logged in. Please log in first.")
      }
    }, [isLoggedIn])

    return isLoggedIn ? <Component {...props} /> : <Navigate to={redirectTo} />
  }
}

export default RequireAuth

// example implementatino

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useUserState } from './path/to/your/hooks'; // Adjust path as needed

// /** Higher-order component for conditional routing */
// export function withCondition(Component, condition, redirectTo) {
//   return function InnerComponent(props) {
//     return condition ? <Component {...props} /> : <Navigate to={redirectTo} replace />;
//   };
// }

// /** Protected route HOC for logged-in users */
// export function withLoggedIn(Component) {
//   return function ProtectedComponent(props) {
//     const user = useUserState(); // Accessing `user` state from Redux
//     const isLoggedIn = Boolean(user); // Condition to check if the user is logged in
//     return withCondition(Component, isLoggedIn, '/home')(props);
//   };
// }
