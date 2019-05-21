var db = require('../utilities/utilities')

module.exports = {
    add: entity => {
        return db.add("writer", entity);
    },

    getUser: (name, password) => {
        return db.user('writer', name, password);
    }
}