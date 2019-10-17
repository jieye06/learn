'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: 'http://localhost:3000',
  SESSION_INVALID_URL: '"http://localhost:3000"'
})
