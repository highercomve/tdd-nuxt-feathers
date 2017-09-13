import { getToken } from '~/utils/auth';

export default function ({ isServer, store, req }) {
  if (isServer && !req) { return; }
  const token = getToken({ isServer, store, req });
  if (!token && !store.state.auth.jwt) {
    return store.dispatch('auth/logout');
  } else if (!store.state.auth.jwt && store.state.auth.user) {
    return store.dispatch('auth/setUserAndJwt', token);
  }
}