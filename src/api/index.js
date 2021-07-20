import http from '../http/http'

// const BASEURL = 'http://localhost:3000/'

export const reqLogin = (username, password) =>
  http('users/login', { username, password }, 'POST')

export const reqRegister = (username, password) =>
  http('users/register', { username, password }, 'POST')
