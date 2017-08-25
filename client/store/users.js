import Vue from 'vue'
import Vuex from 'vuex'
import client from '@/plugins/feathers'
import { setToken, unsetToken } from '~/utils/auth'

const users = client.service('users')

export const state = () => ({
  jwt: '',
  data: {}
})

export const actions = {
  setUserAndJwt ({ commit }, token) {
    return getAndSetUser( {commit })({ accessToken: token })
  },
  authenticate ({ commit }, credentials) {
    const data = {
      strategy: 'local',
      ...credentials
    }
    return client.authenticate(data).then(getAndSetUser({commit}))
      
  }
}

const getAndSetUser = ({commit}) => (token) => {
  if (!token) { return Promise.reject('Token is ivalid') }
  setToken(token.accessToken)
  commit('setJwt', token.accessToken)
  return client.passport.verifyJWT(token.accessToken)
  .then(payload => {
    return client.service('users').get(payload.userId);
  })
  .then(user => {
    client.set('user', user)    
    return commit('setUser', user)        
  })
  .catch(error => {
    console.error('Error authenticating!', error);
    return Promise.reject(error)
  })
}

export const mutations = {
  setUser(state, user) {
    state.data = user
  },
  setJwt(state, accessToken) {
    state.jwt = accessToken
  }
}
