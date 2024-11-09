import { Link, useLocation } from "react-router-dom"

const Breadcrumbs = () => {
  const location = useLocation()
  let currentLink = ''

  let crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
  crumbs = crumbs.map((crumb, index) => {
    currentLink += `/${crumb}`
    console.log(currentLink);

    return (
      <div className="crumb" key={crumb}>
        <Link to={currentLink} className="hover:text-secondary hover:underline capitalize">{crumb}</Link>
        {index < crumbs.length - 1 && <p className="my-1 inline mx-2">&gt;</p>}
      </div>
    )
  })
  console.log(crumbs);

  return (
    <div className="padding pt-4 flex text-primary text-xs">
      {crumbs}
    </div>
  )
}
export default Breadcrumbs