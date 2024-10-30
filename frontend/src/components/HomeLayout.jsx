import { Outlet } from "react-router-dom"

const HomeLayout = () => {
  return (
    <>
      <div>HomeLayout</div>
      <button className="btn hover:bg-indogo-400" >This is Diasy ui button</button>
      <Outlet />

    </>
  )
}
export default HomeLayout