const express = require('express')
const app = express()
const users = require('./users.json')
var mysql = require('mysql');

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "root"

});

db.connect(function (err) {

    if (err) throw err;

    console.log("Connecté à la base de données MySQL!");

    db.query("CREATE DATABASE codingcrush", function (err, result) {

        if (err) console.log(err);
        else console.log("Base de données créée !");

    });

    db.query()

});


// Middleware
app.use(express.json())

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    res.status(200).json(user)
})

app.post('/users', (req, res) => {
    users.push(req.body)
    res.status(200).json(users)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})