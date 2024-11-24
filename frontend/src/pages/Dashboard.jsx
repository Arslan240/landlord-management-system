import { Outlet, useNavigation } from "react-router-dom"
import Header from "../components/Header"
import RequireAuth from "../components/RequireAuth"
import Sidebar from "../components/Sidebar"
import SidebarRenderer from "../components/SidebarRenderer"
import Breadcrumbs from "../components/Breadcrumbs"
import { createContext, useContext, useRef, useState } from "react"
import Loading from "../components/Loading"

const SidebarContext = createContext()

export const useSidebarContext = () => useContext(SidebarContext)

// use these breakpoints to set classnames manually in useEffect.
const Dashboard = ({ children }) => {
  const [expanded, setExpanded] = useState(true)
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"
  const outletRef = useRef()

  return (
    <>
      <div className="flex h-screen ">
        {/* <Sidebar /> */}
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <SidebarRenderer />
        </SidebarContext.Provider>
        <div className="flex flex-col w-full">
          <Header />
          <Breadcrumbs />
          {isLoading ? (
            <Loading />
          ) : (
            <main
              className={`flex-grow padding dashboard-outlet transition-all delay-[50] text-sm w-full  
                ${expanded && "w-full"} sm:w-[85%] 
                md:${expanded ? "w-full" : "w-[85%]"} lg:${expanded ? "w-full" : "w-[85%]"} xl:${
                expanded ? "w-full" : "w-[85%]"
              } 3xl:w-[75%] mx-auto overflow-y-auto max-w-[85rem] `}
            >
              <Outlet />
            </main>
          )}
        </div>
      </div>
    </>
  )
}
export default RequireAuth(Dashboard)
