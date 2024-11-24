import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const Maintenance = () => {
  return <OutletPageWrapper title={"Maintenance"}></OutletPageWrapper>
}

export default RequireAuth(Maintenance)
