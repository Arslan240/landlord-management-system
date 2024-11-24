import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const Leases = () => {
  return <OutletPageWrapper title={"Leases"}></OutletPageWrapper>
}

export default RequireAuth(Leases)
