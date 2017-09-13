import client from '@/plugins/feathers';
import { setToken, unsetToken } from '~/utils/auth';

export const state = () => intitialState();

export const actions = {
  setUserAndJwt ({ commit }, token) {
    return getAndSetUser({ commit })({ accessToken: token });
  },
  authenticate ({ commit, state }) {
    const data = {
      strategy: 'local',
      email: state.loginData.email,
      password: state.loginData.password
    };
    return client.authenticate(data)
      .then(getAndSetUser({ commit }))
      .then(() => {
        return commit('resetLoginData');
      })
      .catch((error) => {
        let errorMessage = '';
        if (!!error && !!error.data && !!error.data.message) {
          errorMessage = error.data.message;
        } else if (!!error && !!error.message) {
          errorMessage = error.message;
        } else {
          errorMessage = error;
        }
        commit('setLoginData', {error: errorMessage});
      });
  },
  logout ({ commit }) {
    try {
      unsetToken();
      commit('restart');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    } 
  }
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setJwt(state, accessToken) {
    state.jwt = accessToken;
  },
  restart (state) {
    state.jwt = intitialState().jwt;
    state.user = intitialState().user;
  },
  setLoginData (state, payload= {}) {
    Object.assign(state.loginData, payload);
  },
  resetLoginData (state) {
    state.loginData = intitialState().loginData;
  }
};

function intitialState () {
  return Object.assign(
    {},
    {
      jwt: '',
      user: {},
      loginData: {
        email: '',
        password: '',
        error: null,
        loading: false
      }
    }
  );
}

function getAndSetUser ({commit}) {
  return (token) => {
    if (!token || !token.accessToken || token.accessToken === '') { 
      return Promise.resolve('Token is ivalid');
    }
    return client.passport.verifyJWT(token.accessToken)
      .then(payload => {
        setToken(token.accessToken);
        commit('setJwt', token.accessToken);
        return client.service('users').get(payload.userId);
      })
      .then(user => {
        client.set('user', user);    
        return commit('setUser', user);        
      })
      .catch(error => {
        return Promise.resolve(error);
      });
  }
};