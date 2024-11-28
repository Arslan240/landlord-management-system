import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../redux/userSlice"

const Profile = ({ size = 35 }) => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className="hover:bg-primary-hover rounded-full flex items-center dropdown dropdown-end pr-2" tabIndex={0} role="button">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-9 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-40 w-52 p-2 shadow">
        <li className="hover:bg-primary-hover rounded-md">
          <Link className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li className="hover:bg-primary-hover rounded-md">
          <Link to={"/dashboard/settings"}>Settings</Link>
        </li>
        <li className="hover:bg-primary-hover rounded-md" onClick={logoutHandler}>
          <a href="">Logout</a>
        </li>
      </ul>
      <div className="text-sm">Jose</div>
    </div>
  )
}
export default Profile
