import { useLoaderData } from "react-router-dom"

export const acceptLeaseLoader =
  (queryClient) =>
  async ({ request }) => {
    return queryClient.fetchQuery()
  }

const AcceptLease = () => {
  const data = useLoaderData()
  console.log("accept lease data: ", data)

  return <div>AcceptLease</div>
}

export default AcceptLease
