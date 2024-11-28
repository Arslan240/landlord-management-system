import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const AddLease = () => {
  // in property dropdown, when you select a property then navigate to the page where property id
  return <OutletPageWrapper title={"Create New Lease"}></OutletPageWrapper>
}

export default RequireAuth(AddLease)
