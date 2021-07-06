// localStorge方法封装
const useStorage = (storageKey = 'authorization') => {
  const localKey = `devpoint.local.${storageKey}`

  const save = data => {
    window.localStorage.setItem(localKey, JSON.stringify(data))
  }

  const get = () => {
    const localData = window.localStorage.getItem(localKey)
    if (localData && localData !== '') {
      return JSON.parse(localData)
    } else {
      return false
    }
  }

  const clear = () => {
    window.localStorage.setItem(localKey, '')
  }

  return {
    save,
    get,
    clear,
  }
}
