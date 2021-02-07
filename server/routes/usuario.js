const express = require('express')
const app = express()
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const {verificaToken, verificaAdmin_role} = require('../middlewares/autenticacion')

app.get('/usuario' ,(req, res) => {

    // return res.json({
    //     usuario: req.usuario
    // })

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
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

    // res.json('get usuario local!!!')
})

app.post('/usuario', [verificaToken, verificaAdmin_role] ,function (req, res) {

    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else { 
    //     res.json({
    //         body
    //     })
    // }


})

app.put('/usuario/:id', [verificaToken, verificaAdmin_role] ,  function (req, res) {

    //let id = req.params.id; con params
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
    let id = req.params.id;


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

})

app.delete('/usuario/:id', [verificaToken, verificaAdmin_role] ,function (req, res) {

    let id = req.params.id;
    let body = req.body;
    //let body = _.pick(req.body, ['estado'])

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

    // Usuario.findByIdAndRemove(id , (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     if (usuarioBorrado === null){
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })

    // })
})

module.exports = app;