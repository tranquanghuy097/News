var db = require('../utilities/utilities')

module.exports = {
    add: entity => {
        return db.add("news", entity);
    },

    byID: id => {
        return db.load(`select * from news where id = ${id}`);
    }
}