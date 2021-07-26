// localStorge方法封装
export function setLocalStorage(localKey, data) {
  window.localStorage.setItem(localKey, JSON.stringify(data))
}

export function getLocalStorage(localKey) {
  const localData = window.localStorage.getItem(localKey)
  if (localData && localData !== '') {
    return JSON.parse(localData)
  } else {
    return false
  }
}

export function clearLocalStorage(localKey) {
  window.localStorage.setItem(localKey, '')
}
