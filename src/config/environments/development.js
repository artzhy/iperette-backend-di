module.exports = {
  web: {
    port: 3000
  },
  secret: 'zidoizdlekf10232ej',
  database: {
    uri: 'mongodb://localhost:27017/iperette'
  },
  logging: {
    appenders: { console: { type: 'console' } },
    categories: { default: { appenders: ['console'], level: 'trace' } }
  }
};
