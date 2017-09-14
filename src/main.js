import Vue from 'vue';
import Vuex from 'vuex';
// Import every subcomponent here
import Login from './components/login.vue';
import * as AuthStore from './components/store.babel';

// Export every subcomponent here
exports.Login = Login;
exports.AuthStore = AuthStore;

Vue.use(Vuex);

const USER_DATA = {
  name: 'Sergio Marin',
  email: 'higher.vnf@gmail.com',
  password: 'supersecreto'
};
const TOKEN = 'TOKEN_MOCK';
const storeMock = AuthStore.default(
  (email, password) => {
    if (!email && !password) {
      return Promise.reject(new Error('invalid credentials'));
    } else if (email === 'invalid@email.com') {
      return Promise.reject(new Error('invalid email'));      
    } else {
      return Promise.resolve(TOKEN);
    }
  },
  ({name, email, password}) => {
    if (!email || !password || !name) {
      return Promise.reject(new Error('you need name, email and password'));
    } else if (email === 'invalid@email.com') {
      return Promise.reject(new Error('invalid email'));      
    } else {
      return Promise.resolve({user_id: 'user_id', name, email, password});
    }
  },
  () => {
    return Promise.resolve({ 
      ...USER_DATA,
      user_id: 'user_id'
    });
  }
);

const store = new Vuex.Store(storeMock);

new Vue({
  el: '#app',
  template: '<Login/>',
  components: { Login },
  store
});