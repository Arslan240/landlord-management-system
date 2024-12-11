import { useNavigation } from "react-router-dom"

const SubmitBtn = ({ text, formSubmitting, classNames, fullWidth }) => {
  const navigation = useNavigation()
  const isSubmitting = formSubmitting || navigation.state === "submitting"

  return (
    <button
      type="submit"
      className={`btn my-4 btn-secondary ${fullWidth ? "btn-block" : ""} disabled:bg-secondary-light ${classNames}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner" />
          Loading
        </>
      ) : (
        text || "submit"
      )}
    </button>
  )
}
export default SubmitBtn
