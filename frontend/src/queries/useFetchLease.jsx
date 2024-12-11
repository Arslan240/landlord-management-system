import React from "react"
import { useQuery } from "@tanstack/react-query"
import { customFetch } from "../utils"

export const fetchLease = async (leaseId) => {
  const { data } = await customFetch(`leases/${leaseId}`)
  return data.lease
}

const useFetchLease = ({ leaseId }) => {
  return useQuery({
    queryKey: ["leases", leaseId],
    queryFn: fetchLease,
    enabled: !!leaseId, //ensures query only runs when leaseId is truthy
  })
}

export default useFetchLease
