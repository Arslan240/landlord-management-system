// try catch used here because if item is not in json format then the whole app breaks.
const getItemFromLocalStorage = (name) => {
  const item = localStorage.getItem(name);
  if (!item) {
      return null; // Return null if there's no item item in local storage
  }
  
  try {
      return JSON.parse(item); // Attempt to parse the item data
  } catch (error) {
      console.error(`Error parsing ${item} data from localStorage:`, error);
      return null; // Return null if parsing fails
  }
};

export default getItemFromLocalStorage