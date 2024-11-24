import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const Tenants = () => {
  return <OutletPageWrapper title={"Tenants"}></OutletPageWrapper>
}

export default RequireAuth(Tenants)
