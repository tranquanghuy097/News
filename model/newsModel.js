var db = require('../utilities/utilities')

module.exports = {
    loadbySub: subcategory => {
        return db.load(`select * from news where subcategory = ${subcategory}`);
    },

    loadbyPage: (limit, offset) => {
        return db.load(`select * from news limit ${limit} offset ${offset}`)
    },

    loadbyBottom: (limit, offset) => {
        return db.load(`select * from news order by id desc limit ${limit} offset ${offset}`)
    }
}