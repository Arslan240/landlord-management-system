import Header from "../components/Header"
import RequireAuth from "../components/RequireAuth"
import Sidebar from "../components/Sidebar"

const Dashboard = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-grow p-4 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
export default RequireAuth(Dashboard)