// src/App.jsx
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import HomeLayout from "./components/HomeLayout"
import {
  Landing,
  Login,
  Register,
  Error,
  EmailVerification,
  VerifyEmail,
  Dashboard,
  Properties,
  SingleProperty,
  AddProperty,
  Tenants,
  Leases,
  Maintenance,
  Employees,
  Chat,
  Transactions,
  Settings,
  AddTenant,
  AddLease,
} from "./pages"

// actions
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as verifyAction } from "./pages/VerifyEmail"
import { store } from "./redux/store"
import { addTenantPropertyLoader } from "./pages/AddTenant"

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
          {
            path: "tenants",
            element: <Tenants />,
          },
          {
            path: "tenants/add-tenant",
            element: <AddTenant />,
            loader: addTenantPropertyLoader(queryClient),
          },
          {
            path: "leases",
            element: <Leases />,
          },
          {
            path: "leases/add-lease",
            element: <AddLease />,
          },
          {
            path: "maintenance",
            element: <Maintenance />,
          },
          {
            path: "employees",
            element: <Employees />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "settings",
            element: <Settings />,
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
