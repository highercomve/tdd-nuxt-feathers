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
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false
  }
};
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

function factoryCommitDispacth (state) {
  const commit = (type, payload) => storeMock.mutations[type](state, payload);
  return {
    commit,
    dispatch (type, payload) {
      return storeMock.actions[type]({ commit, state }, payload);
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
  storeMock.mutations.setJwt(state, null);
  t.is(state.jwt, DEFAULT_STATE.jwt);
});

test('clear user', t => {
  const state = storeMock.state();
  storeMock.mutations.setUser(state, null);
  t.deepEqual(state.user, DEFAULT_STATE.user);
});

test('clear loginData', t => {
  const state = storeMock.state();
  storeMock.mutations.setLoginData(state, null);
  t.deepEqual(state.loginData, DEFAULT_STATE.loginData);
});

test('clear signupData', t => {
  const state = storeMock.state();
  storeMock.mutations.setSignupData(state, null);
  t.deepEqual(state.signupData, DEFAULT_STATE.signupData);
});

test('actions -> authenticate wrong', async t => {
  const state = storeMock.state();
  const { commit, dispatch } = factoryCommitDispacth(state);
  state.loginData.email = 'invalid@email.com';
  state.loginData.password = USER_DATA.pasword;

  await storeMock.actions.authenticate({ commit, state, dispatch })
    .catch(() => {
      t.is(state.jwt, '');
      t.is(state.loginData.error, 'invalid email');
    });
});

test('actions -> authenticate ok', async t => {
  const state = storeMock.state();
  const { commit, dispatch } = factoryCommitDispacth(state);
  state.loginData.email = USER_DATA.email;
  state.loginData.password = USER_DATA.pasword;
  
  await storeMock.actions.authenticate({ commit, state, dispatch })
    .then(() => {
      t.is(state.jwt, TOKEN);
      t.is(state.loginData.error, null);
    });
});

test('actions -> logout', t => {
  const state = storeMock.state();
  const { commit, dispatch } = factoryCommitDispacth(state);
  storeMock.actions.logout({ commit, state, dispatch });
  t.is(state.jwt, '');
  t.deepEqual(state.user, DEFAULT_STATE.user);
});

test('actions -> createAccount wrong', async t => {
  const state = storeMock.state();
  const { commit, dispatch } = factoryCommitDispacth(state);

  await storeMock.actions.createAccount({ commit, state, dispatch })
    .catch(() => {
      t.is(state.jwt, '');
      t.is(state.signupData.error, 'you need name, email and password');
    });
});

test('actions -> createAccount ok', async t => {
  const state = storeMock.state();
  const { commit, dispatch } = factoryCommitDispacth(state);

  state.signupData.name = USER_DATA.name;
  state.signupData.email = USER_DATA.email;
  state.signupData.password = USER_DATA.password;

  await storeMock.actions.createAccount({ commit, state, dispatch })
    .then(() => {
      t.is(state.jwt, TOKEN);
      t.deepEqual(state.user, {
        ...USER_DATA,
        user_id: 'user_id'
      });
      t.is(state.signupData.error, null); 
    });
});

test('actions -> setJwtAndGetUser', async t => {
  const state = storeMock.state();
  const { commit, dispatch } = factoryCommitDispacth(state);
  await storeMock.actions.setJwtAndGetUser({ commit, state, dispatch }, TOKEN)
    .then(() => {
      t.is(state.jwt, TOKEN);
      t.deepEqual(state.user, {
        ...USER_DATA,
        user_id: 'user_id'
      });
    });
});

test('actions -> setJwt', async t => {
  const state = storeMock.state();
  const { commit, dispatch } = factoryCommitDispacth(state);
  await storeMock.actions.updateJwt({ commit, state, dispatch }, TOKEN)
    .then(() => {
      t.is(state.jwt, TOKEN);
      t.deepEqual(state.user, {});
    });
});
