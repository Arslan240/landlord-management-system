import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const Employees = () => {
  return <OutletPageWrapper title={"Employees"}></OutletPageWrapper>
}

export default RequireAuth(Employees)
