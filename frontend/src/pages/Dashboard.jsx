import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import RequireAuth from "../components/RequireAuth"
import Sidebar from "../components/Sidebar"
import SidebarRenderer from "../components/SidebarRenderer"
import Breadcrumbs from "../components/Breadcrumbs"

const Dashboard = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        {/* <Sidebar /> */}
        <SidebarRenderer />
        <div className="flex flex-col w-full">
          <Header />
          <Breadcrumbs/>
          <main className="flex-grow padding dashboard-outlet bg-primary-backg">
            Dashboard
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
export default RequireAuth(Dashboard)