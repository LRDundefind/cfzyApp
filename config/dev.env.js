'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    BASE_PATH: '"https://47.106.86.30:8080/headImg/"',
    BASE_API: '"https://47.106.86.30:8080/"',
})
