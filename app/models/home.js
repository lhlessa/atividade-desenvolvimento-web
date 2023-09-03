const dbConnection = require("../../config/dbConnection");

module.exports = {
    getPaintings : (dbConnection, callBack) => {
        const sql = 'select * from obrasdearte;';
        dbConnection.query(sql, callBack);
    },

    addPainting: (painting, dbConnection, callBack) => {
        const sql = `insert into obrasdearte (nome, artista, comentarios, ano, urlimagem) VALUES ("${painting.nome}", "${painting.artista}", "${painting.comentarios}", "${painting.ano}", "${painting.urlimagem}");`;
        console.log(sql);
        dbConnection.query(sql, callBack);
    }
}