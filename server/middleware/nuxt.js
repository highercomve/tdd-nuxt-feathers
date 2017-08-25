const { Nuxt, Builder } = require('nuxt');
const config = require('../../nuxt.config');
const logger = require('winston');

const nuxt = new Nuxt(config);

if (config.dev) {
  new Builder(nuxt).build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

module.exports = nuxt;