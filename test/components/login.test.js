import Vue from 'vue/dist/vue.common';
import test from 'ava';
import Login from '../../src/components/login.vue';
import mount from '../helpers/vue.helpers';
import * as AuthStore from '../../src/components/store.babel';

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

test('Renders', t => {
  const store = AuthStore.default(() => {}, () => {}, () => {});
  const { vm } = mount(Login, store);
  t.is(vm.$el.textContent.trim(), 'Login');
});

test('Login need email and password', async t => {
  const { vm } = mount(Login, storeMock);
  const emailInput = vm.$el.querySelector('input[name="email"]');
  const passwordInput = vm.$el.querySelector('input[name="password"]');
  const form = vm.$el.getElementsByTagName('form')[0];
  const event = new window.Event('submit', {
    'bubbles'    : true, // Whether the event will bubble up through the DOM or not
    'cancelable' : true  // Whether the event may be canceled or not
  });
  const changeEvnt = new window.Event('input', {
    'bubbles'    : true, // Whether the event will bubble up through the DOM or not
    'cancelable' : true  // Whether the event may be canceled or not
  });
  emailInput.value = USER_DATA.email;
  emailInput.dispatchEvent(changeEvnt);
  await Vue.nextTick()
    .then(() => {
      t.deepEqual(vm.$store.state.user, {});
      t.is(vm.$store.state.jwt, '');
      t.is(vm.$el.textContent.trim(), 'Login');

      form.dispatchEvent(event);
      return Vue.nextTick();
    })
    .then(() => {
      t.is(vm.$store.state.loginData.email, USER_DATA.email);
      t.not(vm.$store.state.loginData.error, null);
      t.deepEqual(vm.$store.state.user, {});
      passwordInput.value = USER_DATA.password;
      passwordInput.dispatchEvent(changeEvnt);
      return Vue.nextTick();
    })
    .then(() => {
      form.dispatchEvent(event);
      return Vue.nextTick();
    })
    .then(() => {
      t.is(vm.$store.state.loginData.error, null);
      t.deepEqual(vm.$store.state.user, {
        ...USER_DATA,
        user_id: 'user_id'
      });
    });
});
