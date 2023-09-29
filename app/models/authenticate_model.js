
module.exports = {

    authenticateUserDataBase: (user, connection, callBack) => {
        console.log('[User Model]', user);
        const sql = `SELECT * FROM users WHERE email = "${user.email}" AND password = "${user.password}";`
        console.log('[User Model]', sql);
        connection.query(sql, callBack);
    }

}