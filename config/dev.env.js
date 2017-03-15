var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost:8000"' // nb: no trailing slash
  // API_ROOT: '"http://api.appointmentguru.co"' // nb: no trailing slash
})
