import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import getItemFromLocalStorage from "../utils/getItemFromLocalStorage"
import useFetchLease, { fetchAllLeases } from "../queries/useFetchLease"
import { getErrorMessage } from "../utils"
import { toast } from "react-toastify"
import { useLoaderData } from "react-router-dom"

export const leaseRequestsLoader = (queryClient) => async ({request}) => {
  try {
    const {data} = await queryClient.fetchQuery({
      queryKey: ['leases'],
      queryFn: () => fetchAllLeases()
    })
    return data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    toast.error(errorMessage)
    return errorMessage
  }
}

const LeaseRequests = () => {
  const {leases} = useLoaderData()

  
  return <OutletPageWrapper title={"Lease Requests"}></OutletPageWrapper>
}

export default LeaseRequests
