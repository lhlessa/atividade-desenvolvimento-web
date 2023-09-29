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
    },

    selectId: (idobra, dbConnection, callBack) => {
        const sql = `select * from obrasdearte where idobra=${idobra};`;
        dbConnection.query(sql, callBack);
    },
    updateObra: (idObra, painting, dbConnection, callBack) => {
    const sql = `update obrasdearte set nome='${painting.nome}', artista='${painting.artista}', comentarios='${painting.comentarios}', ano='${painting.ano}', urlimagem='${painting.urlimagem}' where idobra=${idObra};`;
        dbConnection.query(sql, callBack);
    },
    addUserRegister: (userRegister, dbConnection, callBack) => {
        const sql = `insert into users (usuario, email, password) VALUES ("${userRegister.usuario}", "${userRegister.email}", "${userRegister.password}");`;
        console.log(sql);
        dbConnection.query(sql, callBack);
    },
}