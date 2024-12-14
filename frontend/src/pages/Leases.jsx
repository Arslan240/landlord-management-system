import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"
import { Link } from "react-router-dom"

const button = (
  <Link to={"/dashboard/leases/add-lease"}>
    <button className="btn text-white btn-secondary btn-sm">Add Lease</button>
  </Link>
)

const Leases = () => {
  return <OutletPageWrapper title={"Leases"} button={button}></OutletPageWrapper>
}

export default RequireAuth(Leases)
