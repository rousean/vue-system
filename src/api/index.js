import http from '../http/http'

// 登录请求
export const reqLogin = (username, password) =>
  http('user/login', { username, password }, 'POST')

// 注册请求
export const reqRegister = (username, password) =>
  http('user/register', { username, password }, 'POST')

// 获取导航列表
export const reqMenuList = () => http('menu/menuList', {}, 'POST')

// 菜单管理界面数据获取
export const reqQueryMenu = () => http('/menu/queryMenu', {}, 'POST')
