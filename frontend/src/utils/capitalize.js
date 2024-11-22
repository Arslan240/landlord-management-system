const capitalize = (term) => {
  const parts = term.split(" ")
  const cap = parts.map((part) => helper(part)).join(" ")
  return cap
}

const helper = (word) => {
  const upArr = word.split("").map((ch, index) => (index === 0 ? ch.toUpperCase() : ch))
  return upArr.join("")
}

export default capitalize
