export function formatRouter(arr) {
  return arr.reduce((acc, item) => {
    if (
      (!item.children || item.children.every(ch => ch.hidden)) &&
      item.name !== '404'
    ) {
      acc.push({
        title: item.meta.title,
        name: item.name,
        icon: item.meta.icon
      })
    }
    if (item.children && item.children.length > 0) {
      acc.push(...formatRouter(item.children))
    }
    return acc
  }, [])
}

const _import = file => () => {
  return import('@/' + file)
}
export function asyncRouterHandle(asyncRouter) {
  return asyncRouter.map(item => {
    if (item.component) {
      item.component = _import(item.component)
    } else {
      delete item['component']
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
}
