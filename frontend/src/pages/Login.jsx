import { Form, Link } from "react-router-dom"
import FormInput from "../components/FormInput"
import HomeIcon from '../components/HomeIcon'
import SubmitBtn from "../components/SubmitBtn";

export const action = async ({ request }) => {
  console.log('login action');
  const formData = Object.fromEntries(await request.formData())
  console.log(formData);
  return null
}


const Login = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center w-screen bg-indigo-50 ">
      <div className="w-4/5 min-w-32 md:w-3/4 max-w-[500px] bg-indigo-200 p-7 sm:p-10 rounded-card gap-5">
        <div className="mx-auto flex w-full justify-center mb-5">
          <HomeIcon />
          <h1 className="text-5xl font-bold  items-center text-neutral-800">Login</h1>
        </div>
        <Form method="POST">
          <FormInput label={'Name'} type={'text'} placeholder={'John Doe'} name={'name'} />
          <FormInput label={'Email'} type={'email'} placeholder={'abc@gmail.com'} name={'email'} />
          <SubmitBtn text={'Login'} />
        </Form>
        <div>
          Not a member? <Link to={'/register'} className="hover:underline text-secondary">Register</Link>
        </div>
      </div>
    </section>
  )
}
export default Login