import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const Transactions = () => {
  return <OutletPageWrapper title={"Transactions"}></OutletPageWrapper>
}

export default RequireAuth(Transactions)
