const express = require('express') // require va chercher la dependance express dans node module
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const app = express() // serveur web sur lequel nous definissons notre API Rest 
const port = 3000 // on defini le port sur lequel nous allons demmarer l'API

app
    .use(favicon(__dirname + '/favicon.ico')) // Middleware utiliser pour la favicon l'ordre est important 
    .use(morgan('dev')) // Middleware morgan inmporté dans les dépendances
    .use(bodyParser.json())

sequelize.initDb()

// Ici nous placerons nos futurs endpoint
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)


// Handle the 404 error
app.use(({res}) => {
    const message  = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))    