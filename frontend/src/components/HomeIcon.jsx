import { Flower } from "lucide-react"
import { Link } from "react-router-dom"

const HomeIcon = ({ size = 45, classNames, expanded }) => {
  return (
    <Link to={'/dashboard'} className={`transition-all px-2 ${classNames}`}>
      <Flower className={`text-5xl `} size={size} color="#6E62E5" />
    </Link>
  )
}
export default HomeIcon