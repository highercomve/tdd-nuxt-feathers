import Vue from 'vue/dist/vue.common';
import test from 'ava';
import Login from '../../src/components/login.vue';
import mount from '../helpers/vue.helpers';
import * as AuthStore from '../../src/components/store.babel';

// const USER_DATA = {
//   name: 'Sergio Marin',
//   email: 'higher.vnf@gmail.com',
//   password: 'supersecreto'
// };
// const TOKEN = 'TOKEN_MOCK';
// const storeMock = AuthStore.default(
//   (email, password) => {
//     if (!email && !password) {
//       return Promise.reject(new Error('invalid credentials'));
//     } else if (email === 'invalid@email.com') {
//       return Promise.reject(new Error('invalid email'));      
//     } else {
//       return Promise.resolve(TOKEN);
//     }
//   },
//   ({name, email, password}) => {
//     if (!email || !password || !name) {
//       return Promise.reject(new Error('you need name, email and password'));
//     } else if (email === 'invalid@email.com') {
//       return Promise.reject(new Error('invalid email'));      
//     } else {
//       return Promise.resolve({user_id: 'user_id', name, email, password});
//     }
//   },
//   () => {
//     return Promise.resolve({ 
//       ...USER_DATA,
//       user_id: 'user_id'
//     });
//   }
// );

test('Renders', t => {
  const store = AuthStore.default(() => {}, () => {}, () => {});
  console.log(Login);
  const { vm } = mount(Login, store);
  t.is(vm.$el.textContent.trim(), 'Your component created with unicorn CLI');
});

// test('Login need email and password', async t => {
//   const { vm } = mount(Login, storeMock);
//   const emailInput = vm.$el.querySelector('input[name="email"]');
//   const passwordInput = vm.$el.querySelector('input[name="password"]');
//   const form = vm.$el.getElementsByTagName('form')[0];
//   const event = new window.Event('submit', {
//     'bubbles'    : true, // Whether the event will bubble up through the DOM or not
//     'cancelable' : true  // Whether the event may be canceled or not
//   });
//   emailInput.value = USER_DATA.email;

//   form.dispatchEvent(event);
  
//   await Vue.nextTick()
//     .then(() => {
//       t.not(vm.$store.state.loginData.error, null);
//       t.is(vm.$el.textContent.trim(), 'Login');
//       t.deepEqual(vm.$store.state.user, {});
//       passwordInput.value = 'password';
//       return Vue.nextTick();
//     })
//     .then(() => {
//       t.is(vm.$store.state.loginData.error, null);
//       t.is(vm.$store.state.user.email, USER_DATA.email);
//       t.is(vm.$store.state.user.password, USER_DATA.password);
//       t.is(vm.$store.state.user.name, USER_DATA.name);
//     });
// });
