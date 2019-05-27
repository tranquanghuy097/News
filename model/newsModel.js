var db = require('../utilities/utilities')

module.exports = {
    loadbyPage: (limit, offset) => {
        return db.load(`select * from news limit ${limit} offset ${offset}`)
    },

    loadbyBottom: (limit, offset) => {
        return db.load(`select * from news order by id desc limit ${limit} offset ${offset}`)
    },

    loadbyCat: (category, limit, offset) => {
        return db.load(`select * from news where subcategory = '${category}' limit ${limit} offset ${offset}`)
    },

    countCat: (category) => {
        return db.load(`select count(*) as total from news where subcategory = '${category}'`)
    },
}