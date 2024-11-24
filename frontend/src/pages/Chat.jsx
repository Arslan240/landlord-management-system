import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"

const Chat = () => {
  return <OutletPageWrapper title={"Chat"}></OutletPageWrapper>
}

export default RequireAuth(Chat)
