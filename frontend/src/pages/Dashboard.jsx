import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import RequireAuth from "../components/RequireAuth"
import Sidebar from "../components/Sidebar"
import SidebarRenderer from "../components/SidebarRenderer"
import Breadcrumbs from "../components/Breadcrumbs"
import { createContext, useContext, useState } from "react"

const SidebarContext = createContext()

export const useSidebarContext = () => useContext(SidebarContext)

const Dashboard = ({ children }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <>
      <div className="flex h-screen">
        {/* <Sidebar /> */}
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <SidebarRenderer />
        </SidebarContext.Provider>
        <div className="flex flex-col w-full bg-primary-backg">
          <Header />
          <Breadcrumbs />
          <main className={`flex-grow padding dashboard-outlet transition-all delay-[50] ${expanded ? 'w-[100%]' : 'w-[85%]'} mx-auto `}>
            Dashboard
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
export default RequireAuth(Dashboard)