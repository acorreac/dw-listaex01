const { body, validationResult } = require('express-validator');

const express = require("express");
const app = express();
const ejs = require('ejs');
bodyParser = require('body-parser');

app.set('view engine', 'ejs');

port = 3000
var usuario = {
    nome: '',
    sobrenome: '',
    idade: -1,
    pais: ''
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const mensagem = "";
    res.render('faixa-etaria', { mensagem });
});

app.post("/", [
    body('idade').isInt({ min: 0 }).withMessage('Entre com uma idade maior que 0')
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.errors[0].msg);
    }
       
    var idade = req.body.idade;
    var mensagem = '';

    if(idade >= 0 && idade < 15) {
        mensagem = 'Criança';
    }else if(idade >= 15 && idade < 30) {
        mensagem = 'Jovem';
    }else if(idade >= 30 && idade < 60) {
        mensagem = 'Adulto';
    }else{
        mensagem = 'Idoso';
    }

    res.render('faixa-etaria', { mensagem });
});


app.get("/media", (req, res) => {
    const message = '';
    res.render('media', { message});
});

app.post("/media", [
    body('pratica').isInt({ min: 0, max: 10 }).withMessage('Entre com uma nota de 0 a 10'),
    body('prova').isInt({ min: 0, max: 10 }).withMessage('Entre com uma nota de 0 a 10'),
    body('trabalho').isInt({ min: 0, max: 10 }).withMessage('Entre com uma nota de 0 a 10')

], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const message = errors.errors[0].msg;
        res.render('media', { message });
        return 
    }
       
    var pratica = req.body.pratica;
    var prova = req.body.prova;
    var trabalho = req.body.trabalho;

    var peso1 = 2;
    var peso2 = 5;
    var peso3 = 3;

    var media = ((peso1 * pratica) + (peso2 * prova) + (peso3 * trabalho)) / (peso1 + peso2 + peso3)
    
    var classificacao = '';
   
    if(media > 9) {
        classificacao = 'A';
    }else if(media >= 8) {
        classificacao = 'B';
    }else if(media >= 7) {
        classificacao = 'C';
    }else if(media >= 6) {
        classificacao = 'D';
    }else if(media >= 5) {
        classificacao = 'E';
    }else {
        classificacao = 'F';
    }

    message = `A média do aluno é = ${media} e sua classificação é ${classificacao}`;

    res.render('media', { message });
});

app.get("/cadastro", (req, res) => {
    res.render('cadastro', { usuario });
});

app.post("/cadastro", [
    body('nome').notEmpty().withMessage('Escreva um nome'),
    body('sobrenome').notEmpty().withMessage('Escreva um sobrenome'),
    body('idade').isInt({ min: 0 }).withMessage('Entre com uma idade maior que 0'),
    body('pais').notEmpty().withMessage('Escreva um país')

], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const message = errors.errors[0].msg;
        res.render('cadastro', { message });
        return 
    }

    usuario = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        pais: req.body.pais
    }

    res.render('cadastro', { usuario });
});

app.listen(port, () => {
    console.log('Servidor iniciado na porta: ' + port)
});