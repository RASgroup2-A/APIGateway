const axios = require('axios');

//! Apenas para improviso, é para eliminar
const docentesDummy = {
    d1:{
        numMecanografico: "d1",
        email: "d1@di.uminho.pt",
        name: "Docente D1",
        password: "passd1",
        type: "docente"
    },
    d2:{
        numMecanografico: "d2",
        email: "d2@di.uminho.pt",
        name: "Docente D2",
        password: "passd2",
        type: "docente"
    },
    d3:{
        numMecanografico: "d3",
        email: "d3@di.uminho.pt",
        name: "Docente D3",
        password: "passd3",
        type: "docente"
    },
    d4:{
        numMecanografico: "d4",
        email: "d4@di.uminho.pt",
        name: "Docente D4",
        password: "passd4",
        type: "docente"
    }
}

//! Apenas para improviso, é para eliminar
const alunosDummy = {
    pg1:{
        numMecanografico: "pg1",
        email: "pg1@di.uminho.pt",
        name: "Aluno D1",
        password: "passpg1",
        type: "aluno"
    },
    pg2:{
        numMecanografico: "pg2",
        email: "pg2@di.uminho.pt",
        name: "Aluno D2",
        password: "passph2",
        type: "aluno"
    },
    pg3:{
        numMecanografico: "pg3",
        email: "pg3@di.uminho.pt",
        name: "Aluno D3",
        password: "passpg3",
        type: "aluno"
    },
    a97223:{
        numMecanografico: "a97223",
        email: "a97223@alunos.uminho.pt",
        name: "Aluno D4",
        password: "password",
        type: "aluno"
    }
}

module.exports.gestaoUtilizadoresAccessPoint = process.env.GESTAO_USERS_AP || 'http://localhost:8001';
module.exports.gestaoUtilizadoresRoute = (route) => this.gestaoUtilizadoresAccessPoint + route

module.exports.login = async (email,password) => {
    //! Versão temporária enquanto não se tiver serviço de utilizadores
    let id = email.split('@')[0];
    let user = docentesDummy[id] || alunosDummy[id];
    if(!user){
        throw new Error('Error: InvalidEmail');
    } else if (user.password === password){
        return {numMecanografico: user.numMecanografico, type: user.type};
    } else {
        throw new Error('Error: InvalidPassword');
    }
}