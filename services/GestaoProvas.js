const axios = require('axios');

module.exports.gestaoProvasAccessPoint = process.env.GESTAO_PROVAS_AP || 'http://localhost:7777';
module.exports.gestaoProvasRoute = (route) => this.gestaoProvasAccessPoint + route

module.exports.checkProvaName = (provaName) => {
    return axios.get(this.gestaoProvasRoute(`/provas/checkname?name=${provaName}`))
        .then((result) => {
            let resp = result.data //> formato: {result: boolean}
            if (!resp.result) { //> O nome da prova é válido
                return true
            } else {
                throw new Error('Error: InvalidProvaName -> ' + provaName)
            }
        }).catch((err) => {
            throw err
        });
}

module.exports.registerProva = (prova) => {
    return axios.post(this.gestaoProvasRoute('/provas'), prova)
        .then((result) => {
            return result.data
        }).catch((err) => {
            throw err
        });
}