import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"
import { Link } from "react-router-dom"

const Tenants = () => {
  const button = (
    <Link to={`/dashboard/tenants/add-tenant`}>
      <button className="btn text-white btn-secondary btn-sm">Add Tenant</button>
    </Link>
  )
  return <OutletPageWrapper title={"Tenants"} button={button}></OutletPageWrapper>
}

export default RequireAuth(Tenants)
