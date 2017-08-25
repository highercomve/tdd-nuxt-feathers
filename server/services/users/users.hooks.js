const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const auth = require('feathers-authentication');

module.exports = {
  before: {
    all: [],
    find: [auth.hooks.authenticate('jwt')],
    get: [],
    create: [local.hooks.hashPassword({ passwordField: 'password' })],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
