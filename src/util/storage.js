// localStorge方法封装
export const setLocalStorage = (localKey, data) => {
  window.localStorage.setItem(localKey, JSON.stringify(data))
}

export const getLocalStorage = localKey => {
  const localData = window.localStorage.getItem(localKey)
  if (localData && localData !== '') {
    return JSON.parse(localData)
  } else {
    return false
  }
}

export const clearLocalStorage = localKey => {
  window.localStorage.setItem(localKey, '')
}
