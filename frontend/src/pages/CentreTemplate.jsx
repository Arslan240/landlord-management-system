const CentreTemplate
  = ({ children }) => {
    return (
      <section className="h-screen flex flex-col items-center justify-center w-screen bg-indigo-50 ">
        <div className="w-4/5 min-w-32 md:w-3/4 max-w-[500px] bg-indigo-200 p-7 sm:p-10 rounded-card gap-5">
        {children}
        </div>
      </section>
    )
  }
export default CentreTemplate
