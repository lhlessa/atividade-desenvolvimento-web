const dbConnection = require('../../config/dbConnection');
const {addUserRegister} = require('../models/home');
let crypto = require('crypto'); 

module.exports.userRegisterController = (app, userRegister, res) => {
    dbConn = dbConnection();
    let senhaCriptografada = crypto.createHash('md5').update(userRegister.password).digest('hex');
    userRegister.password = senhaCriptografada;
    addUserRegister(userRegister, dbConn, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
}


