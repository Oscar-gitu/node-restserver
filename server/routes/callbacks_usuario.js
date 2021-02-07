const express = require('express')
const app = express()
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')
const _ = require('underscore')

let encontrarUsuario = (desde, limite, callback) => {

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            return callback(err, usuarios);
        })
}

let encontrarUsuarioPromise = (desde, limite) => {

    return new Promise((resolve, reject) => {
        Usuario.find({ estado: true }, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(usuarios);
                }
            })
    })

}

let encontrarUsuarioAsync = async (desde, limite) => {

    const usuarios = await Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec()

    return usuarios

}

let obtenerinfo = async (desde, limite) => {
    let respuesta;
    try {
        respuesta = await encontrarUsuarioAsync(desde, limite)
    } catch (e) {
        respuesta = e
    }
    return respuesta
}

app.get('/usuario', function async(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);


    encontrarUsuario(desde, limite, (err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuarios,
            cantidad: usuarios.length
        })
    })

    encontrarUsuarioPromise(desde, limite).then(data => {
        res.json({
            ok: true,
            data,
            cantidad: data.length
        })
    }).catch(err => {
        res.status(400).json({
            ok: false,
            err
        })
    })

    let respuesta;
    try {
        respuesta = await encontrarUsuarioAsync(desde, limite)
    } catch (e) {
        respuesta = e
    }

    res.json({
        usuario: respuesta
    })

    res.json('get usuario local!!!')


    obtenerinfo(desde, limite).then(data => {
        console.log(data)
    }).catch( err => {
        console.log(err)
    })

})

module.exports = app;