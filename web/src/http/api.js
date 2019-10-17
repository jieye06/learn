import http from './httpConfig.js'
export default {
  login: function(params) {
    return http.post('/api/login', params)
  }
}
