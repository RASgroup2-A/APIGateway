const axios = require('axios');

module.exports.gestaoNotificacoesAccessPoint = 'http://localhost:8888';
module.exports.gestaoNotificacoesRoute = (route) => this.gestaoNotificacoesAccessPoint + route

module.exports.getnotifications = (id) => {
    return axios.get(this.gestaoNotificacoesRoute(`/notifications/${id}`))
        .then((result) => {
            return result.data
        }).catch((err) => {
            throw err
        });
}