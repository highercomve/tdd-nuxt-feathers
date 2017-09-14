import Vue from 'vue';
// Import every subcomponent here
import Login from './components/login.vue';
import * as AuthStore from './components/store.babel';

// Export every subcomponent here
exports.Login = Login;
exports.AuthStore = AuthStore;

new Vue({
  el: '#app',
  template: '<Login/>',
  components: { Login }
});