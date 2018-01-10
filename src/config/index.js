const fs = require('fs');
const path = require('path');
require('dotenv').config();
const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(path.join(__dirname, 'environments', ENV));

const config = Object.assign(
  {
    [ENV]: true,
    env: ENV
  },
  envConfig
);

module.exports = config;
