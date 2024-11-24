import React from "react"

const OutletPageWrapper = ({ children, title, showTitle, button }) => {
  return (
    <section className="pb-5">
      {title && (
        <div className="flex justify-between">
          <h1 className={`capitalize text-2xl sm:text-3xl font-semibold mb-2`}>{title}</h1>
          {button}
        </div>
      )}
      {children}
    </section>
  )
}

export default OutletPageWrapper
