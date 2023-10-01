const dbConnection = require('../../config/dbConnection');
const { getPaintings } = require('../models/home');
const { addPainting } = require('../models/home');
const { selectId } = require('../models/home');
const { updateObra } = require('../models/home');
const { deleteId } = require('../models/home');
const logger = require('../../config/logger');


module.exports.home = (app, req, res) => {
    dbConn = dbConnection();

    getPaintings(dbConn, (error, result) => {
        if (error) {
            logger.log({

                level: 'error',
                message: error.message
            });
            let pagina = "<h1>Erro encontrado. Problema com a conexão do banco de dados. </h1><h2>" + error + "</h2>";
            res.status(500).send(pagina);
            console.log(req.session.user);
        }
        else {
            res.render("home.ejs", { paintings: result, isAuthenticated: req.session.authenticate, user: req.session.user});
        }

    })


}

module.exports.addPaintingController = (app, req, res) => {
    console.log('[Controller Home Add Painting]');
    const painting = req.body;

    dbConn = dbConnection();
    addPainting(painting, dbConn, (error) => {
        console.log(error);
        res.redirect('/');
    });
}

module.exports.selectById = (idObra, callBack) => {
    dbConn = dbConnection();
    selectId(idObra, dbConn, callBack);
}

module.exports.updateById = (app, req, res) => {
    const painting = req.body;
    const idObra = parseInt(painting.idobra);
    dbConn = dbConnection();

    updateObra(idObra, painting, dbConn, (error) => {
        if(error){
            console.log(error);
        }
    });

}

module.exports.deleteById = (app, req, res) =>{
    const idObra = parseInt(req.query.idobra);
    console.log(idObra);
    dbConn = dbConnection();
    deleteId(idObra, dbConn, (error) => {
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/');
        }
    });
}

