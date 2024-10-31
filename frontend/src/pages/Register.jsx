import { Form, Link, redirect } from "react-router-dom"
import FormInput from "../components/FormInput"
import HomeIcon from '../components/HomeIcon'
import SubmitBtn from "../components/SubmitBtn"
import CentreTemplate from "./CentreTemplate"
import { customFetch } from "../utils/customFetch"
import {toast} from 'react-toastify'

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData())
  
  try {
    const resp = await customFetch.post('/auth/register', formData)
    console.log(resp.status);
    // const {user} = data.user
    // toast.success(`${user} You\'ve been registered successfully`)
    return redirect('/email-verification')
  } catch (error) {
    const errorMessage = error?.response?.data || error?.response?.statusText || 'Something Went Wrong'
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
        <FormInput label={'Name'} type={'text'} placeholder={'John Doe'} name={'name'} />
        <FormInput label={'Email'} type={'email'} placeholder={'abc@gmail.com'} name={'email'} />
        <FormInput label={'Password'} type={'password'} placeholder={'******'} name={'password'} />
        <SubmitBtn text={'Register'} />

      </Form>
      <div>
        Already have an account? <Link to={'/login'} className="hover:underline text-secondary">Login</Link>
      </div>
    </CentreTemplate>
  )
}
export default Register