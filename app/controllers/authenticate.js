const dbConnection = require('../../config/dbConnection');
const {authenticateUserDataBase} = require('../models/authenticate_model');
let crypto = require('crypto'); 

module.exports.authenticateUser = (app,req,res) => {
    console.log("Controller User Auth User");
    let user = req.body;
    console.log(user);
    dbConn = dbConnection();
    let senhaCriptografada = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = senhaCriptografada;
    authenticateUserDataBase(user, dbConn, (error, result) => {
        if(error){
            console.log(error);
        }
        if(result.length>0){
            console.log('Usuario autenticado');
            console.log(result);
            user = result[0];
            console.log('User controller req.session', req.session);
            req.session.authenticate=true;
            req.session.user = {
                id: user.userid,
                email: user.email,
                usuario: user.usuario
            };
            console.log('User controller req.session', req.session);
            res.redirect('/');
        }
        else{
            console.log('Falha na autenticação');
            res.send('Falha na autenticação');
        }

    });
}