import test from 'ava';
import * as AuthStore from '../../src/components/store.babel';

const ERROR_INVALID_PARAMETERS_ON_FACTORY = 'The store factory need add login function, signup function and getProfile function';
const DEFAULT_STATE = {
  jwt: '',
  user: {},
  loginData: {
    email: '',
    password: '',
    error: null,
    loading: false
  },
  signupData: {
    email: '',
    password: '',
    error: null,
    loading: false
  }
};
const USER_DATA = {
  name: 'Sergio Marin',
  email: 'higher.vnf@gmail.com',
  pasword: 'supersecreto'
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

function factoryCommit (state) {
  return {
    commit (type, payload) {
      return storeMock.mutations[type](state, payload);
    }
  };
}


test('factory need two functions', t => {
  const error = t.throws(() => {
    AuthStore.default();
  });
  t.is(error.message, ERROR_INVALID_PARAMETERS_ON_FACTORY);
});

test('factory works ', t => {
  const store = AuthStore.default(() => {}, () => {}, () => {});
  t.deepEqual(store.state(), DEFAULT_STATE);
  t.not(store.actions, null);
  t.not(store.mutations, null);
  t.not(store.getters, null);
});

test('mutate jwt', t => {
  const state = storeMock.state();
  storeMock.mutations.setJwt(state, TOKEN);
  t.is(state.jwt, TOKEN);
});

test('mutate user', t => {
  const state = storeMock.state();
  storeMock.mutations.setUser(state, USER_DATA);
  t.deepEqual(state.user, USER_DATA);
});

test('mutate loginData', t => {
  const state = storeMock.state();
  let newData = { email: 'email@email.com' }; 
  storeMock.mutations.setLoginData(state, newData);
  t.deepEqual(state.loginData.email, newData.email);
});

test('mutate signupData', t => {
  const state = storeMock.state();
  let newData = { email: 'email@email.com' }; 
  storeMock.mutations.setSignupData(state, newData);
  t.deepEqual(state.signupData.email, newData.email);
});

test('clear jwt', t => {
  const state = storeMock.state();
  storeMock.mutations.clearJwt(state);
  t.is(state.jwt, DEFAULT_STATE.jwt);
});

test('clear user', t => {
  const state = storeMock.state();
  storeMock.mutations.clearUser(state);
  t.deepEqual(state.user, DEFAULT_STATE.user);
});

test('clear loginData', t => {
  const state = storeMock.state();
  storeMock.mutations.clearLoginData(state);
  t.deepEqual(state.loginData, DEFAULT_STATE.loginData);
});

test('clear signupData', t => {
  const state = storeMock.state();
  storeMock.mutations.clearSignupData(state);
  t.deepEqual(state.signupData, DEFAULT_STATE.signupData);
});

test('actions -> authenticate wrong', t => {
  const state = storeMock.state();
  const commit = factoryCommit(state);
  state.loginData.email = 'invalid@email.com';
  state.loginData.password = USER_DATA.pasword;

  storeMock.actions.authenticate({ commit, state });
  t.is(state.jwt, '');
  t.is(state.loginData.error, 'invalid email');
});

test('actions -> authenticate ok', t => {
  const state = storeMock.state();
  const commit = factoryCommit(state);
  state.loginData.email = USER_DATA.email;
  state.loginData.password = USER_DATA.pasword;
  
  storeMock.actions.authenticate({ commit, state });
  t.is(state.jwt, TOKEN);
  t.is(state.loginData.error, null);
});

test('actions -> logout', t => {
  const state = storeMock.state();
  const commit = factoryCommit(state);
  storeMock.actions.logout({ commit, state });
  t.is(state.jwt, '');
  t.deepEqual(state.user, DEFAULT_STATE.user);
});

test('actions -> createAccount wrong', t => {
  const state = storeMock.state();
  const commit = factoryCommit(state);

  storeMock.actions.createAccount({ commit, state });
  t.is(state.jwt, '');
  t.is(state.signupData.error, 'you need name, email and password');
});

test('actions -> createAccount ok', t => {
  const state = storeMock.state();
  const commit = factoryCommit(state);

  state.createAccount.name = USER_DATA.name;
  state.createAccount.email = USER_DATA.email;
  state.createAccount.password = USER_DATA.pasword;

  storeMock.actions.createAccount({ commit, state });
  t.is(state.jwt, TOKEN);
  t.deepEqual(state.user, {
    ...USER_DATA,
    user_id: 'user_id'
  });
  t.is(state.signupData.error, null);  
});

test('actions -> setJwtAndGetUser', t => {
  const state = storeMock.state();
  const commit = factoryCommit(state);
  storeMock.actions.setJwtAndGetUser({ commit, state }, TOKEN);
  t.is(state.jwt, TOKEN);
  t.deepEqual(state.user, {
    ...USER_DATA,
    user_id: 'user_id'
  });
});

test('actions -> setJwt', t => {
  const state = storeMock.state();
  const commit = factoryCommit(state);
  storeMock.actions.updateJwt({ commit, state }, TOKEN);
  t.is(state.jwt, TOKEN);
  t.deepEqual(state.user, {});
});
