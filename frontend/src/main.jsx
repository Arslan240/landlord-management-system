import "./wdyr.js" // <--- first import, commented out till u need it.
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "react-toastify/dist/ReactToastify.css"
import App from "./App.jsx"
import "./index.css"
import { ToastContainer } from "react-toastify"
import { Provider } from "react-redux"
import { store } from "./redux/store.js"
import AuthContext from "./context/AuthContext.jsx"

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthContext>
      <App />
      <ToastContainer position="top-center" />
    </AuthContext>
  </Provider>
)
