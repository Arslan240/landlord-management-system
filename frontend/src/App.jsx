// src/App.jsx
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import HomeLayout from "./components/HomeLayout"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Error from "./pages/Error"
import EmailVerification from "./pages/EmailVerification"
import VerifyEmail from "./pages/VerifyEmail"

// actions
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as verifyAction } from "./pages/VerifyEmail"
import { store } from "./redux/store"
import Dashboard from "./pages/Dashboard"
import Properties from "./pages/Properties"
import SingleProperty from "./pages/SingleProperty"
import AddProperty from "./pages/AddProperty"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "dashboard",
        element: <Dashboard />, //here we can also set outlet page wrapper and then show dashboard in index child in children array
        children: [
          {
            path: "properties",
            element: <Properties />,
          },
          {
            path: "properties/:id",
            element: <SingleProperty />,
          },
          {
            path: "properties/add-property",
            element: <AddProperty />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
    errorElement: <Error />,
  },
  {
    path: "/email-verification",
    element: <EmailVerification />,
    errorElement: <Error />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
    action: verifyAction,
    errorElement: <Error />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
