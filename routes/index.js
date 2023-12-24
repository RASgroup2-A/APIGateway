var express = require('express');
var router = express.Router();

const GestaoProvas = require('../services/GestaoProvas')
const GestaoUtilizadores = require('../services/GestaoUtilizadores')
const GestaoNotificacoes = require('../services/GestaoNotificacoes')
const GestaoSalas = require('../services/GestaoSalas')

router.post('/login', function (req, res, next) {
    //! A função GestaoUtilizadores.login está improvisada
    let email = req.body.email;
    let password = req.body.password;
    GestaoUtilizadores.login(email, password)
        .then((result) => { //> result no formato {numMecanografico: string, type: string}
            console.log(result)
            res.jsonp({ msg: 'Login bem sucedido!', token: JSON.stringify(result), type: result.type, numMecanografico: result.numMecanografico });
        }).catch((err) => {
            if (err.message === 'Error: InvalidEmail' || err.message === 'Error: InvalidPassword') {
                res.status(401).jsonp({ msg: err.message });
            }
            else {
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

/**
 * Rota para solicitar propostas de calendarização tendo em conta os alunos, data+hora e duração da prova.
 */
router.post('/salas/calendarizacao', function (req, res, next) {
    let { alunos, dataHora, duracao } = req.body;
    GestaoSalas.propostasCalendarizacao(alunos, dataHora, duracao)
        .then((result) => {
            res.jsonp(result);
        }).catch((err) => {
            res.status(500).jsonp({ msg: err.message });
        });
})


/**
 * Rota para filtrar notificacoes de um dado aluno.
 */
router.get('/notifications/:id', function (req, res, next) {
    GestaoNotificacoes.getnotifications(req.params.id)
        .then((result) => {
            res.jsonp(result);
        }).catch((err) => {
            res.status(500).jsonp({ msg: err.message });
        });
})


/**
 * Rota para submeter uma prova
 */
router.post('/provas/register', function (req, res, next) {
    let prova = req.body
    //> Alocação de salas
    let alocacoes = prova.versoes.map(versao => ({idSala: versao._id, data: versao.data, duracao: versao.duracao}))
    
    //> Criação da prova
    GestaoProvas.registerProva(prova)
        .then((result) => {
            res.jsonp(result)
        }).catch((err) => {
            console.log(err)
            res.status(500).jsonp({ msg: err.message });
        });
})

module.exports = router;
