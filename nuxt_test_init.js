const { Nuxt, Builder } = require('nuxt')
const { resolve } = require('path')

let nuxt = null
let config = {}

function initializeServer () {
  try {
    const rootDir = resolve(__dirname, '.')
    config = require(resolve(rootDir, 'nuxt.config.js'))
    config.rootDir = rootDir // project folder
    config.dev = false // production build
    nuxt = new Nuxt(config)

    return new Builder(nuxt).build()
      .then(() => {
        nuxt.listen(4000, 'localhost', () => {
          return Promise.resolve()
        })
      })
  } catch (e) {
    return Promise.reject()
  }
}

function closeServer () {
  return nuxt.close()
}

function getNuxt () {
  return nuxt
}

function getConfig () {
  return config
}

module.exports = {
  closeServer,
  getConfig,
  getNuxt,
  initializeServer
}
