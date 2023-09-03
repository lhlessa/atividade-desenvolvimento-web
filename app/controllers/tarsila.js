const dbConnection = require('../../config/dbConnection');;
const { getPaintings } = require('../models/tarsila');

module.exports.tarsila = (app, req, res) => {
    dbConn = dbConnection();

    getPaintings(dbConn, (error, result) => {
        //console.log(error);
        //console.log(result);
        res.render("tarsila.ejs", { paintings: result });
    })
}
