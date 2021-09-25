import http from '../http/http'

// const BASEURL = 'http://localhost:3000/'

export const reqLogin = (username, password) =>
  http('user/login', { username, password }, 'POST')

export const reqRegister = (username, password) =>
  http('user/register', { username, password }, 'POST')

export const reqRouter = () => http('menu/menuList', {}, 'POST')

// 菜单管理界面数据获取
export const reqQueryMenu = () => http('/menu/queryMenu', {}, 'POST')
