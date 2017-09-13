/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const nuxt = require('./middleware/nuxt');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
  nuxt.showOpen();
  logger.info(`Feathers application started on ${app.get('host')}:${port}`);
});
