import http from '../http/http'

// 登录请求
export const reqLogin = userInfo => http('user/login', userInfo, 'POST')

// 注册请求
export const reqRegister = userInfo => http('user/register', userInfo, 'POST')

// 获取动态导航列表
export const reqDynamicMenu = () => http('menu/menuList', {}, 'POST')

// 菜单管理界面数据获取
export const reqQueryMenu = () => http('/menu/queryMenu', {}, 'POST')
