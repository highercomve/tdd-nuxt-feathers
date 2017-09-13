import createLogger from 'vuex/dist/logger';

export const plugins = [];

if (process.browser) {
  plugins.push(createLogger());
}

export const state = () => ({});

export const actions = {};

export const mutations = {};
