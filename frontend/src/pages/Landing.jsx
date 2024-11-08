import RequireAuth from "../components/RequireAuth"

const Landing = () => {
  console.log('Landing Page');
  return (
    <div>Landing</div>
  )
}
export default RequireAuth(Landing)