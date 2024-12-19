const Btn = ({ text, isSubmitting, classNames, fullWidth, type, name, value, clickHandler }) => {
  return (
    <button
      type={type}
      name={name}
      value={value}
      onClick={clickHandler}
      className={`btn my-4 btn-secondary ${fullWidth ? "btn-block" : ""} disabled:opacity-85 ${classNames}`}
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
export default Btn
