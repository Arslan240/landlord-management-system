export { default as customFetch } from "./customFetch"
export { default as createUrlParams } from "./createUrlParams"
export { default as getObjectKeyFromS3Url } from "./getObjectKeyFromS3Url"
export { default as capitalize } from "./capitalize"
export { default as getErrorMessage } from "./getErrorMessage"
export { default as getAddressFromObject } from "./getAddressFromObject"
// TODO: correct this dependency issue by moving the user out and creating async thunk.
// consult this chat: https://chatgpt.com/share/67482fdf-f428-800b-81aa-6c5bc1d2bfa6
// removed it from here and importing it directly from file because it was causing circular dependency and in turn causing initialization issues.
// 4) utils/index.js > utils/customFetch.js > redux/store.js > redux/userSlice.js
// export { default as getItemFromLocalStorage } from "./getItemFromLocalStorage"
