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

    categories: categoryName => {
        return new Promise ((resolve, reject) =>{
            var sql = `select * from subcategory where category = ${categoryName}`;
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

    update: (tableName, idField, entity) => {
        return new Promise ((resolve, reject) =>{
            var id = entity[idField];
            delete entity[idField]
            var sql = `update ${tableName} set ? where ${idField} = ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, [entity, id], (error, value) => {
                if(error)
                    reject(error);
                else{
                    resolve(value.changedRows);
                }
                connection.end();
            })
        })
    },

    delete: (tableName, idField, id) => {
        return new Promise ((resolve, reject) =>{
            var sql = `delete from ${tableName} where ${idField} = ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, id, (error, value) => {
                if(error)
                    reject(error);
                else{
                    resolve(value.affectedRows);
                }
                connection.end();
            })
        })
    },
}