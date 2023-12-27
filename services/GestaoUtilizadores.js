const axios = require('axios');

module.exports.gestaoUtilizadoresAccessPoint = process.env.GESTAO_USERS_AP || 'http://localhost:8001';
module.exports.gestaoUtilizadoresRoute = (route) => this.gestaoUtilizadoresAccessPoint + route

module.exports.login = (email, password) => {
    return axios.post(this.gestaoUtilizadoresRoute('/users/login'), { "email": email, "password": password })
        .then((result) => {
            let resp = result.data
            if (resp != null) {
                return resp
            } else {
                throw new Error('Error: InvalidUsername -> ' + username)
            }
        }).catch((err) => {
            throw err
        });
}

module.exports.register = (userData) => {
    return axios.post(this.gestaoUtilizadoresRoute(`/users/register`), userData)
        .then((result) => {
            let resp = result.data
            if (!resp.result) {
                return resp
            } else {
                throw new Error('Error: InvalidUsername -> ' + userData.username)
            }
        }).catch((err) => {
            throw err
        });
}

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