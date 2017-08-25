const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const auth = require('feathers-authentication');
const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
// app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());
app.configure(auth({
  secret: 'supersecret',
  setCookie: true,
  cookie: {
    name: 'feathers-jwt',
    enabled: true, // whether the cookie should be enabled
    httpOnly: false, // whether the cookie should not be available to client side JavaScript
    secure: !process.env.isDevelopment // whether cookies should only be available over HTTPS
  }
}))
app.configure(local())
app.configure(jwt())

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
app.service('authentication').hooks({
  before: {
    create: [
      auth.hooks.authenticate(['jwt', 'local'])
    ],
    remove: [
      auth.hooks.authenticate('jwt')
    ]
  }
});

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
