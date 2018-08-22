'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STATIC_URL: '""',
  API_URL:'"http://192.168.43.118:3000"',
  WEBSOCKET:'"ws://122.18.237.165:8811"',
  JAVA_SOCKET:'"ws://192.168.43.118:3000"'
})
