import { MoreVertical, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useContext, createContext, useState } from "react"
import HomeIcon from "./HomeIcon"
import { Link } from "react-router-dom"
import { useSidebarContext } from "../pages/Dashboard"

export default function Sidebar({ children }) {
  const { expanded, setExpanded } = useSidebarContext()

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className={`p-4 pb-2 flex justify-between transition-all items-center`}>
          <HomeIcon size={35} classNames={!expanded ? "hidden" : "visbile"} expanded={expanded} />
          {/* <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                }`}
              alt=""
            /> */}
          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ">
            <ChevronsLeft className={`transition-all ${!expanded ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="border-t flex p-3">
          <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-32 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <div className="hover:bg-primary-hover rounded-full p-2 cursor-pointer">
              <MoreVertical size={20} />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useSidebarContext()

  return (
    <Link
      to={to}
      className={`
        relative flex items-center py-2 px-3 my-1.5
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
    `}
    >
      {icon}
      <span className={`text-sm font-normal overflow-hidden transition-all ${expanded ? "w-32 ml-3" : "w-0"}`}>{text}</span>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}

      {!expanded && (
        <div
          className={`
          absolute left-full z-50 rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-secondary-bright text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  )
}
