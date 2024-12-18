import { toast } from "react-toastify"
import moment from "moment"
import { useLoaderData } from "react-router-dom"
import { fetchLease } from "../queries/useFetchLease"
import OutletPageWrapper from "../components/OutletPageWrapper"
import { getAddressFromObject, getErrorMessage } from "../utils"
import { useUserState } from "../redux/userSlice"

export const acceptLeaseLoader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const searchParams = new URL(request.url).searchParams
      const leaseId = searchParams.get("leaseId")
      return queryClient.fetchQuery({
        queryKey: ["leases", leaseId],
        queryFn: () => fetchLease(leaseId),
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      // return error
    }
  }

// TODO: in future, add an svg returned from server, it should have a vintage design of document and lease details in it, also add accept and reject buttons.
// resources: https://venngage.com/blog/lease-agreement/
const AcceptLease = () => {
  const data = useLoaderData()
  const { name } = useUserState()
  const { landlord, property, startDate, endDate, rent, deposit } = data
  const { name: propertyName } = property

  const start = moment(startDate).format("MMMM do, YYYY")
  const end = endDate ? moment(endDate).format("MMMM do, YYYY") : null

  console.log("accept lease data: ", data)

  const address = getAddressFromObject(property.address)
  const title = propertyName || address

  return (
    <OutletPageWrapper title={"Accept Lease"}>
      <div className="px-2 py-4">
        <h1 className="text-2xl mb-2">Lease for {title}</h1>
        <p>
          Hi, {name}. Your landlord {landlord.name} has requested you to accept this lease.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h2 className="mt-2 text-xl font-extrabold">Property</h2>
            <p>
              {propertyName && (
                <p>
                  <span className="font-semibold">Name: </span>
                  <span>{propertyName}</span>
                </p>
              )}
              <p>
                <span className="font-semibold">Address: </span>
                <span>{address}</span>
              </p>
            </p>
          </div>
          <div>
            <h2 className="mt-2 text-xl font-extrabold">Lease </h2>
            <p>
              <span className="font-semibold">Start: </span>
              <span>{start} </span>
            </p>
            <p>
              <span className="font-semibold">End: </span>
              <span>{end ? end : "Forseeable Future"} </span>
            </p>
          </div>
          <div>
            <h2 className="mt-2 text-xl font-extrabold">Rent </h2>
            <p>
              <span className="font-semibold">Rent: </span>
              <span>${rent} </span>
            </p>
            <p>
              <span className="font-bold">Deposit: </span>
              <span>{deposit ? `$${deposit}` : "Nill"} </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="btn  btn-success text-white rounded-full ">Accept</button>
        <button className="btn  btn-error text-white rounded-full">Reject</button>
      </div>
    </OutletPageWrapper>
  )
}

export default AcceptLease
