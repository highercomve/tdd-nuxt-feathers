import { getToken } from '~/utils/auth'

export default function ({ isServer, store, req }) {
  if (isServer && !req) { return }
  const token = getToken({isServer, store, req})
  return store.dispatch('users/setUserAndJwt', token)
}