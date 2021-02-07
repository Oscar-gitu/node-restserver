const jwt = require('jsonwebtoken')
//Verificar token

let verificaToken = (req, res, next) => {

    let token = req.get('token'); //autorization header

    // res.json({
    //     token
    // })

    jwt.verify(token, process.env.SEED, (err, decoded) =>{
        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: `Token invalido : ${err}`
                }
            })
        }
        req.usuario = decoded.usuario;
        next(); //El next actua tal cual para continuar, porque sino se detiene en el middleware
    })

};

let verificaAdmin_role = (req, res, next) => {

    let usuario = req.usuario

    if(usuario.role != 'ADMIN_ROLE'){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }{
        next();
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_role
}