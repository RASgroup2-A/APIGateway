var express = require('express');
var router = express.Router();


const GestaoProvas = require('../services/GestaoProvas')
const GestaoUtilizadores = require('../services/GestaoUtilizadores')

router.post('/login', function (req, res, next) {
    //! A função GestaoUtilizadores.login está improvisada
    let email = req.body.email;
    let password = req.body.password;
    GestaoUtilizadores.login(email, password)
        .then((result) => { //> result no formato {numMecanografico: string, type: string}
            res.jsonp({ msg: 'Login bem sucedido!', token: JSON.stringify(result) });
        }).catch((err) => {
            if(err.message === 'Error: InvalidEmail' || err.message === 'Error: InvalidPassword'){
                res.status(401).jsonp({ msg: err.message });
            }
            else{
                res.status(500).jsonp({ msg: err.message });
            }
        });
})

/**
 * Rota para validar o nome da prova e os dados dos alunos
 * Use cases: Criar prova, ...
*/
router.post('/provas/checkNameAndAlunos', function (req, res, next) {
    let provaName = req.body.provaName;
    let alunos = req.body.alunos;
    GestaoProvas.checkProvaName(provaName)
        .then((result) => {
            if (result) { //> result é booleano (true se o nome é válido)
                //! TODO: Fazer aqui a verificação dos dados dos alunos à GESTÃO DE UTILIZADORES
                res.jsonp({ msg: 'NÃO IMPLEMENTADO!!!!!!!' }) //! tirar isto quando se implementar a verificação de alunos
            } else {
                res.status(400).jsonp({ msg: `Error: InvalidProvaName -> '${provaName}'` });
            }
        }).catch((err) => { //> Caso haja uma resposta de erro por parte da gestão de provas
            res.status(500).jsonp({ msg: err.message });
        });
});

module.exports = router;
