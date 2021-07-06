import http from '../http/http'

export const login = () => http('http://localhost:3000/words/bookLists')
