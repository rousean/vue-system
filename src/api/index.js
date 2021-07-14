import http from '../http/http'

const BASEURL = 'http://localhost:3000/'

export const login = (username, password) =>
  http(BASEURL + 'users/login', { username, password }, 'POST')

export const register = (username, password) =>
  http(BASEURL + 'users/register', { username, password }, 'POST')
