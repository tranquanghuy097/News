var mySQL = require('mysql');
var createConnection = () => {
    return mySQL.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "secret",
        database: "website",
    })
};

module.exports = {
    load: sql => {
        return new Promise ((resolve, reject) =>{
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, result, fields) => {
                if(error)
                    reject(error);
                else{
                    resolve(result);
                }
                connection.end();
            })
        })
    },

    add: (tableName, entity) => {
        return new Promise ((resolve, reject) =>{
            var sql = `insert into ${tableName} set ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, entity, (error, value) => {
                if(error)
                    reject(error);
                else{
                    resolve(value.insertID);
                }
                connection.end();
            })
        })
    },

}