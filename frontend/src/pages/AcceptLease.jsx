import { useLoaderData } from "react-router-dom"
import { fetchLease } from "../queries/useFetchLease"
import OutletPageWrapper from "../components/OutletPageWrapper"

export const acceptLeaseLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { id: leaseId } = params
      return queryClient.fetchQuery({
        queryKey: ["leases", leaseId],
        queryFn: fetchLease(leaseId),
      })
    } catch (error) {
      toast.error(error.message)
      return error
    }
  }

const AcceptLease = () => {
  const data = useLoaderData()
  console.log("accept lease data: ", data)

  return <OutletPageWrapper showTitle={"Accept Lease"}></OutletPageWrapper>
}

export default AcceptLease
