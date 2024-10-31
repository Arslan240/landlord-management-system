import { Form, Link, redirect } from "react-router-dom"
import FormInput from "../components/FormInput"
import HomeIcon from '../components/HomeIcon'
import SubmitBtn from "../components/SubmitBtn";
import { customFetch } from "../utils/customFetch";
import CentreTemplate from "./CentreTemplate";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const action = async ({ request }) => {
  console.log('login action');
  const formData = Object.fromEntries(await request.formData())
  try {
    const { data } = await customFetch.post('/auth/login', formData)
    const { user } = data.user
    console.log(user);
    toast.success(`Welcome ${user}! you have logged in Successfully!`)
    return redirect('/')
  } catch (error) {
    const errorMessage = error?.response?.data || error?.response?.statusText || 'Something Went Wrong'
    if (errorMessage === 'Please verify your email') {
      toast.warn(`Please verify your email. Check your email ${formData.email}`)
      return redirect('/email-verification')
    }
    toast.error(errorMessage)
    return null
  }
}


const Login = () => {

  useEffect(() => {
    window.history.replaceState(null, '', window.location.href)
  }, [])

  return (
    <CentreTemplate>
      <div className="mx-auto flex w-full justify-center mb-5">
        <HomeIcon />
        <h1 className="text-5xl font-bold  items-center text-neutral-800">Login</h1>
      </div>
      <Form method="POST">
        <FormInput label={'email'} type={'email'} placeholder={'abc@gmail.com'} name={'email'} defaultValue={'fevige6808@aleitar.com'} />
        <FormInput label={'password'} type={'password'} placeholder={'******'} name={'password'} defaultValue={'secret123'} />
        <SubmitBtn text={'Login'} />
      </Form>
      <div>
        Not a member? <Link to={'/register'} className="hover:underline text-secondary">Register</Link>
      </div>
    </CentreTemplate>
  )
}
export default Login