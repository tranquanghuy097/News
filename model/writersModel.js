var db = require('../utilities/utilities')

module.exports = {
    add: entity => {
        return db.add("writer", entity);
    },

    getUser: (name) => {
        return db.user('writer', name);
    },

    loadbyWriter: (name, limit, offset) => {
        return db.load(`select * from news where writer = '${name}' limit ${limit} offset ${offset}`)
    },

    countNews: (name) => {
        return db.load(`select count(*) as total from news where writer = '${name}'`)
    },
}