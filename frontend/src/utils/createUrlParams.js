const createUrlParams = (selectedFilters) => {
  let paramsStr = ""
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
  return paramsStr
}

export default createUrlParams
