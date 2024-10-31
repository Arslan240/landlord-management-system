import { useNavigation } from "react-router-dom"

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <button
      type="submit"
      className="btn my-4 btn-secondary btn-block disabled:bg-secondary-light"
      disabled={isSubmitting}
    >
      {
        isSubmitting ? (
          <>
            <span className="loading loading-spinner" />
            Loading
          </>
        ) : (
          text || 'submit'
        )
      }
    </button>
  )
}
export default SubmitBtn