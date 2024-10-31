import CentreTemplate from "./CentreTemplate"

// TODO: Add a button for end email again. Also add this route in backend because this route doesn't exist. Also figure out a way of authenticating user in this situation.
const EmailVerification = () => {
  return (
    <CentreTemplate>
      <h2 className="text-5xl font-bold pb-5">Email Verification</h2>
      <p>An Email has been sent to your email. Please check your email to verify it.</p>
    </CentreTemplate>
  )
}
export default EmailVerification