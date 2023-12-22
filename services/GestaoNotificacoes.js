const axios = require('axios');

module.exports.gestaoNotificacoesAccessPoint = process.env.GESTAO_PROVAS_AP || 'http://localhost:8888';
module.exports.gestaoNotificacoesRoute = (route) => this.gestaoNotificacoesAccessPoint + route

module.exports.getnotifications = (id) => {
    return axios.get(this.gestaoNotificacoesRoute(`/notifications/${id}`))
        .then((result) => {
            return result.data
        }).catch((err) => {
            throw err
        });
}