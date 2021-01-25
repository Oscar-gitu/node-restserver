const express = require('express')
const app = express()
const mongoose = require('mongoose');

const bodyParser = require('body-parser')
require('./config/config')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'))


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, resp) => {
    if (err) {
        throw new Error('Error en conexion de base de datos');
    }
    console.log('Conenctado a mongodb')
});


app.listen(process.env.PORT, () => {
    console.log('escuchando en el puerto ' + process.env.PORT)
})