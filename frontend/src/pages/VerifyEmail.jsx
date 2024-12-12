import { Form, redirect, useSearchParams } from "react-router-dom"
import CentreTemplate from "./CentreTemplate"
import SubmitBtn from "../components/SubmitBtn"
import FormInput from "../components/FormInput"
import { customFetch, getErrorMessage } from "../utils"
import { toast } from "react-toastify"

// TODO: If user have the url, he can come back to this page, but devise some process where user is not allowed here.
// 1- Change register controller which maybe store some state in session or
// 2- Send a registeration cookie which tells, the user is not yet verified. And if there is no such cookie, then don't let user come to this page.

export const action = async ({ request }) => {
  try {
    const formData = Object.fromEntries(await request.formData())
    console.log(formData)
    const { data } = await customFetch.post("/auth/verify-email", {
      ...formData,
    })
    const { msg } = data
    toast.success(msg)
    return redirect("/login")
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    toast.error(errorMessage)
    return null
  }
}

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")
  const token = searchParams.get("verificationToken")
  console.log(email, token)

  return (
    <CentreTemplate>
      <Form method="POST">
        <h1 className="text-4xl font-bold">Verify your Email</h1>
        <FormInput type={"hidden"} value={email} name={"email"} />
        <FormInput type={"hidden"} value={token} name={"verificationToken"} />
        <p>Click on the following button to verify your email.</p>
        <SubmitBtn text={"Verify Email"} />
      </Form>
    </CentreTemplate>
  )
}
export default VerifyEmail
