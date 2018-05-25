'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    BASE_PATH: '"https://xdy-tmp.52cfzy.com/headImg/"',
    BASE_API: '"https://xdy-tmp.52cfzy.com/"',
})
