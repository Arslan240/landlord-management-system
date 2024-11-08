// src/App.jsx
import 'preline'; // Import to ensure JS behaviors work
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './components/HomeLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import EmailVerification from './pages/EmailVerification';
import VerifyEmail from './pages/VerifyEmail';

// actions
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as verifyAction } from './pages/VerifyEmail'
import { store } from './redux/store';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      // here use requireAuth component, and if multiple components then put them in children array.
      {
        index: true,
        element: <Landing />
      },
      // here put those components which don't need auth
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
    errorElement: <Error />,
  },
  {
    path: '/email-verification',
    element: <EmailVerification />,
    errorElement: <Error />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
    action: verifyAction,
    errorElement: <Error />
  }

])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
