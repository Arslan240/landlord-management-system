import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

// 1- First section - one for requests on properties maintained by the current user (including requests made by the user as a landlord)
// 2- Second section - one for requests made by current user on other properties which user might have rented before
const Maintenance = () => {
  return <OutletPageWrapper title={"Maintenance"}></OutletPageWrapper>
}

export default RequireAuth(Maintenance)
