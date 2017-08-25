import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import client from '@/plugins/feathers'

export const plugins = []

if (process.browser) {
  plugins.push(createLogger())
}

export const state = () => ({})

export const actions = {}

export const mutations = {}