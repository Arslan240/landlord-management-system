import { fetchLease } from "../queries/useFetchLease"
import { useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import OutletPageWrapper from "../components/OutletPageWrapper"
import { getErrorMessage } from "../utils"

export const singleLeaseLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { id: leaseId } = params
      console.log(leaseId)
      return await queryClient.fetchQuery({
        queryKey: ["leases", leaseId],
        queryFn: () => fetchLease(leaseId),
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      return error
    }
  }

const SingleLease = () => {
  const data = useLoaderData()
  console.log("Single Lease Loader data", data)
  return <OutletPageWrapper title={"Single Lease"}></OutletPageWrapper>
}

export default SingleLease
