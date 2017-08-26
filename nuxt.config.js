const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  dev: process.env.NODE_ENV !== 'production',
  srcDir: 'client/',
  loading: {
      color: '#92D3CE',
  },
  router: {
    middleware: 'check-auth'
  },
  plugins: [
    {src: '~plugins/feathers', ssr: false}
  ],
  env: {
    NODE_ENV: process.env.NODE_ENV,
    isDevelopment: process.env.NODE_ENV !== 'production'
  },
  build: {
    vendor: ['axios']
  },
  modules: [
    '@nuxtjs/bulma'
  ],
  css: [
    // Load a node module directly (here it's a SASS file)
    'bulma',
    // CSS file in the project
    '@/assets/css/main.css',
    // SCSS file in the project
    '@/assets/css/main.scss'
  ]
};