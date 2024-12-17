const { sendEmail } = require("./sendEmail")

const sendLeaseAcceptanceEmail = async ({ email, name, leaseDetails, origin }) => {
  const { address, leaseId } = leaseDetails
  await sendEmail({
    to: email,
    subject: `Rently - Lease Acceptance Request for property at ${address.street}, ${address.postalCode}`,
    html: `<h2>Lease Request for property at ${address.street}, ${address.postalCode}</h2> 
    <p>Dear ${name}, you have a new lease request for property at ${address.street}, ${address.postalCode}.
        Please click following button to accept the request
    </p>
      <a href="http:localhost:5173/dashboard/leases/accept-lease?leaseId=${leaseId}">Accept lease</a>
    `,
  })
}

module.exports = sendLeaseAcceptanceEmail
