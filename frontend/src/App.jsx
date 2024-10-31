// src/App.jsx
import 'preline'; // Import to ensure JS behaviors work
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './components/HomeLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// actions
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import Error from './pages/Error';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
    errorElement: <Error />
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
    errorElement: <Error />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
