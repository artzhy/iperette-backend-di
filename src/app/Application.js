class Application {
  constructor({ logger, server, database, userService }) {
    this.logger = logger.getLogger('App');
    this.server = server;
    this.database = database;
    userService.flush().then(success => {
      this.logger.debug('database flushed');
      userService
        .add({
          firstname: 'Alexandre',
          lastname: 'Behaghel',
          email: 'alex.behaghel@gmail.com'
        })
        .then(userService.getAll())
        .then(resp => {
          this.logger.debug('voila ', resp);
        });
    });
  }
  async start() {
    await this.database.authenticate();
    await this.server.start();
  }
}
module.exports = Application;
