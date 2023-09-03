module.exports = {
    getPaintings : (dbConnection, callBack) => {
        const sql = 'select * from obrasdearte where artista like "%Tarsila%";';
        dbConnection.query(sql, callBack);
    }
}