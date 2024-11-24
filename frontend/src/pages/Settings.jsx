import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const Settings = () => {
  return <OutletPageWrapper title={"Settings"}></OutletPageWrapper>
}

export default RequireAuth(Settings)
