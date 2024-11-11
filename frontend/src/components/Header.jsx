// TODO: there will be a simple class which makes sure, the width of elements rendered inside the /dashboard route is same. like .align-element class by smilga in course.

import { Bell } from "lucide-react"
import Search from "./Search"
import Profile from "./Profile"

// align-element{ px-4 }

const Header = () => {
  return (
    <nav className="navbar bg-indigo-50 padding max-h-10">
      <div className="flex justify-between  w-full">
        <Search header placeholder={'Enter search term'} />
        <div className="flex gap-4 ">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary-hover">

            <div className="indicator">
              <Bell />
              <div className="badge badge-sm indicator-item rounded-full px-1 py-0.5 text-[.7rem]">
                28
              </div>
            </div>
          </div>
          <Profile />
        </div>
      </div>
    </nav>
  )
}
export default Header

