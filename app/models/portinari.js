module.exports = {
    getPaintings : (dbConnection, callBack) => {
        const sql = 'select * from obrasdearte where artista like "%Portinari%";';
        dbConnection.query(sql, callBack);
    }
}