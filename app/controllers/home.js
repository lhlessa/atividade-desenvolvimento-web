const dbConnection = require('../../config/dbConnection');;
const { getPaintings } = require('../models/home');
const { addPainting } = require('../models/home');


module.exports.home = (app, req, res) => {
    dbConn = dbConnection();

    getPaintings(dbConn, (error, result) => {
        console.log(error);
        console.log(result);
        res.render("home.ejs", { paintings: result });
    })


}

module.exports.addPaintingController = (app, req, res) => {
    console.log('[Controller Home Add Painting]');
    let painting = req.body;

    dbConn = dbConnection();
    addPainting(painting, dbConn, (error) => {
        console.log(error);
        res.redirect('/');
    });

}



