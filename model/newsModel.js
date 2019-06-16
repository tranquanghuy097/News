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

    addComment: entity => {
        return db.add("comment", entity);
    },

    loadComment: (id, limit, offset) => {
        return db.load(`select * from comment where newsid = '${id}' order by id desc limit ${limit} offset ${offset}`)
    },

    countComment: (id) => {
        return db.load(`select count(*) as total from comment where newsid = '${id}'`)
    },
}