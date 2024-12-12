import { Form, Link, redirect } from "react-router-dom"
import FormInput from "../components/FormInput"
import HomeIcon from "../components/HomeIcon"
import SubmitBtn from "../components/SubmitBtn"
import CentreTemplate from "./CentreTemplate"
import { customFetch, getErrorMessage } from "../utils"
import { toast } from "react-toastify"
import { store } from "../redux/store"
import { register } from "../redux/userSlice"

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData())
  formData["idNumber"] = formData["idNumber"].toUpperCase()

  try {
    const resp = await customFetch.post("/auth/register", formData)
    console.log(resp)

    const user = resp?.data?.user
    const { name, email } = user

    toast.success(`${name} You\'ve been registered successfully. A verification email has been sent to your email ${email}`)

    store.dispatch(register(user))

    return redirect("/email-verification")
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    toast.error(errorMessage)
    return null
  }
}

const Register = () => {
  return (
    <CentreTemplate>
      <div className="mx-auto flex w-full justify-center mb-5">
        <HomeIcon />
        <h1 className="text-5xl font-bold  items-center text-neutral-800">Register</h1>
      </div>
      <Form method="POST">
        <FormInput label={"Name"} type={"text"} placeholder={"John Doe"} name={"name"} />
        <FormInput label={"Email"} type={"email"} placeholder={"abc@gmail.com"} name={"email"} />
        <FormInput label={"Password"} type={"password"} placeholder={"******"} name={"password"} />
        <FormInput label={"Govt ID Number"} type={"text"} placeholder={"XXXX-XXXXXX-XX"} name={"idNumber"} />
        <SubmitBtn text={"Register"} />
      </Form>
      <div>
        Already have an account?{" "}
        <Link to={"/login"} className="hover:underline text-secondary">
          Login
        </Link>
      </div>
    </CentreTemplate>
  )
}
export default Register
