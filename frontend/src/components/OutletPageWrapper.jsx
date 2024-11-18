import React from "react"

const OutletPageWrapper = ({ children, title = true, showTitle }) => {
  return (
    <section className="pb-5">
      {title && <h1 className="capitalize text-3xl font-semibold">{title}</h1>}
      {children}
    </section>
  )
}

export default OutletPageWrapper
