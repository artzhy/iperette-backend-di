const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // use native Promise

class Database {
  constructor({ config, logger }) {
    this.logger = logger.getLogger('DB');
    this.config = config;
    this.mongoose = mongoose;
  }

  enableLogging() {
    if (this.config.development) {
      this.mongoose.set('debug', true, function(coll, method, query, doc) {
        this.logger.debug('query executed:', coll, method, query, doc);
      });
    }
  }

  authenticate() {
    return this.mongoose.connect(this.config.database.uri, {
      useMongoClient: true
    });
  }
}

module.exports = Database;
