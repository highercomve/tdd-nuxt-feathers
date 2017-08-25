import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
const TOKEN_STRING = 'feathers-jwt'

export const setToken = (token) => {
  if (!process.browser) return
  window.localStorage.setItem(TOKEN_STRING, token)
  Cookie.set(TOKEN_STRING, token)
}

export const unsetToken = () => {
  if (!process.browser) return
  window.localStorage.removeItem(TOKEN_STRING)
  Cookie.remove(TOKEN_STRING)
}

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${TOKEN_STRING}=`))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getTokenFromLocalStorage = () => {
  const json = window.localStorage.getItem(TOKEN_STRING)
  return json
}

export const getToken = ({isServer, store, req}) => {
  return isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage()
}
