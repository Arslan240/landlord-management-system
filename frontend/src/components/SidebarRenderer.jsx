import { BriefcaseBusiness, Building, FileUser, HandCoins, LayoutGrid, MessageCircle, Pickaxe, Settings, SquareUserRound } from "lucide-react"
import { useLocation } from "react-router-dom"
import Sidebar, { SidebarItem } from "./Sidebar"

const iconSize = "1.4rem"
const strokeWidth = "1.6px"

const SidebarRenderer = () => {
  const location = useLocation()
  const sidebarRoutes = [
    {
      icon: <LayoutGrid size={iconSize} strokeWidth={strokeWidth} />,
      text: "Dashboard",
      to: "/dashboard",
      active: location.pathname === "/dashboard" || location.pathname === "/dashboard/",
      alert: false,
    },
    {
      icon: <Building size={iconSize} strokeWidth={strokeWidth} />,
      text: "Properties",
      to: "/dashboard/properties",
      active: location.pathname === "/dashboard/properties",
      alert: false,
    },
    {
      icon: <SquareUserRound size={iconSize} strokeWidth={strokeWidth} color="#5CA4A9" />,
      text: "Tenants",
      to: "/dashboard/tenants",
      active: location.pathname === "/dashboard/tenants",
      alert: false,
    },
    {
      icon: <FileUser size={iconSize} strokeWidth={strokeWidth} />,
      text: "Leases",
      to: "/dashboard/leases",
      active: location.pathname === "/dashboard/leases",
      alert: false,
    },
    {
      icon: <Pickaxe size={iconSize} strokeWidth={strokeWidth} color="#FEB913" />,
      text: "Maintenance",
      to: "/dashboard/maintenance",
      active: location.pathname === "/dashboard/maintenance",
      alert: false,
    },
    {
      icon: <BriefcaseBusiness size={iconSize} strokeWidth={strokeWidth} color="#003F6B" />,
      text: "Employees",
      to: "/dashboard/employees",
      active: location.pathname === "/dashboard/employees",
      alert: false,
    },
    {
      icon: <MessageCircle size={iconSize} strokeWidth={strokeWidth} />,
      text: "Chat",
      to: "/dashboard/chat",
      active: location.pathname === "/dashboard/chat",
      alert: true,
    },
    {
      icon: <HandCoins size={iconSize} strokeWidth={strokeWidth} />,
      text: "Transactions",
      to: "/dashboard/transactions",
      active: location.pathname === "/dashboard/transactions",
      alert: false,
    },
    {
      icon: <Settings size={iconSize} strokeWidth={strokeWidth} />,
      text: "Settings",
      to: "/dashboard/settings",
      active: location.pathname === "/dashboard/settings",
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
