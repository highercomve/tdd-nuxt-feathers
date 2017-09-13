import { getToken } from '~/utils/auth';

export default function ({ isServer, store, req }) {
  if (isServer && !req) { return; }
  const token = getToken({ isServer, store, req });
  if (!token) {
    return store.dispatch('auth/logout');
  } else {
    return store.dispatch('auth/setUserAndJwt', token);
  }
}