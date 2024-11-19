import React from "react"

const OutletPageWrapper = ({ children, title = true, showTitle }) => {
  return (
    <section className="pb-5">
      {title && <h1 className={`capitalize text-2xl sm:text-3xl font-semibold mb-2`}>{title}</h1>}
      {children}
    </section>
  )
}

export default OutletPageWrapper
