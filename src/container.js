const awilix = require('awilix');
const Application = require('./app/Application');
const Server = require('./app/Server');
const Database = require('./app/Database');
const router = require('./app/router');

const logger = require('./logging/logger');
const config = require('./config');
const UserModel = require('./app/models/UserModel');
const UserService = require('./app/services/UserService');

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

container.register({
  app: awilix.asClass(Application).setLifetime(awilix.Lifetime.SINGLETON),
  server: awilix.asClass(Server).setLifetime(awilix.Lifetime.SINGLETON),
  database: awilix.asClass(Database).setLifetime(awilix.Lifetime.SINGLETON),
  userService: awilix
    .asClass(UserService)
    .setLifetime(awilix.Lifetime.SINGLETON),
  config: awilix.asValue(config),
  logger: awilix.asFunction(logger),
  router: awilix.asFunction(router),
  user: awilix.asValue(UserModel)
});
module.exports = container;
