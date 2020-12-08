const express = require('express')
const app = express()
const users = require('./users.json')

/*

const db = mysql.createConnection({

    host: "localhost",
 
    user: "nom_utilisateur",
 
    password: "mot_de_passe_utilisateur"
 
  });

  */

// Middleware
app.use(express.json())

app.get('/users', (req,res) => {
    res.status(200).json(users)
})

app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    res.status(200).json(user)
})

app.post('/users', (req,res) => {
    users.push(req.body)
    res.status(200).json(users)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})