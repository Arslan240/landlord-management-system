const createUrlParams = (selectedFilters, searchTerm, page) => {
  let paramsStr = ""

  if (searchTerm) {
    paramsStr += `search=${searchTerm}`
  }
  Object.keys(selectedFilters).forEach((key) => {
    const { min, max } = selectedFilters[key]
    console.log("function run")
    if (min) {
      if (paramsStr.length > 0) paramsStr += "&"
      paramsStr += `${key}_min=${min}`
    }
    if (max) {
      if (paramsStr.length > 0) paramsStr += "&"
      paramsStr += `${key}_max=${max}`
    }
  })

  if (page) {
    if (paramsStr.length > 0) paramsStr += "&"
    paramsStr += `page=${page}`
  }
  console.log(paramsStr)
  return paramsStr
}

export default createUrlParams
