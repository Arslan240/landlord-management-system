import { Building, LayoutGrid } from "lucide-react"
import { useLocation } from "react-router-dom"
import Sidebar, { SidebarItem } from "./Sidebar"

const iconSize = "1.3rem"

const SidebarRenderer = () => {
  const location = useLocation()
  const sidebarRoutes = [
    {
      icon: <LayoutGrid size={iconSize} />,
      text: "Dashboard",
      to: "/dashboard",
      active: location.pathname === "/dashboard" || location.pathname === "/dashboard/",
      alert: false,
    },
    {
      icon: <Building size={iconSize} />,
      text: "Properties",
      to: "/dashboard/properties",
      active: location.pathname === "/dashboard/properties",
      alert: false,
    },
  ]

  return (
    <>
      <Sidebar>
        {sidebarRoutes.map((item, index) => {
          return <SidebarItem {...item} key={index} />
        })}
      </Sidebar>
    </>
  )
}
export default SidebarRenderer
