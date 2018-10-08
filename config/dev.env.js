'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST:"/api/"
  // API_HOST: '"http://139.224.5.126:1111/"'
})
