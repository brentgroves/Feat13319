/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');

const mqtt = require('mqtt');
const config = require('../../Config13319/config.json');
//const hostname = app.get('host');
//const port = app.get('port');
//const port = config.BPGServicesPort;
const port = process.env.REACT_APP_FEATHERS_PORT;
//const server = app.listen(port, 'localhost');
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//const server = app.listen(port, hostname);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on port %d', port)
);

// For good measure let's create a message
// So our API doesn't look so empty
/*
app.service('test').create({
  text: 'Hello world from the server',
});
app.service('mstest').create({
  text: 'Hello world from the server',
});
*/
// TEST ONLY SECTION

  app.service('users')
    .create({
      "email": "user@buschegroup.com",
      "password": "password",
      "userName": "bgroves",
      "firstName": "Brent",
      "lastName": "Groves",
      "isAdmin": true,
      "roles": [ "Admin", "Manager", "Quality"]


    }).then(async (res) => {
        console.log('created user!')
    }).catch(e => {
      console.error('Authentication error', e);
    });
