const dbConnection = require('../../config/dbConnection');;
const { getPaintings } = require('../models/portinari');

module.exports.portinari = (app, req, res) => {
    dbConn = dbConnection();

    getPaintings(dbConn, (error, result) => {
        //console.log(error);
        //console.log(result);
        res.render("portinari.ejs", { paintings: result });
    })
}
