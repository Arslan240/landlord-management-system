import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const RequireVerification = ({ children }) => {
  const navigate = useNavigate()
  const user = useSelector(state => state.userState.user)

  useEffect(() => {
    if (user && !user.isVerified) {
      console.log('user from require verification', user);
      toast.error('Please verify your email')
      navigate('/email-verification', { replace: true })
    }
  }, [navigate, user])

  return (user && user.isVerified) || !user ? children : null
}
export default RequireVerification