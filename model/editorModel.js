var db = require('../utilities/utilities')

module.exports = {
    add: entity => {
        return db.add("editor", entity);
    },

    getUser: (name, password) => {
        return db.user('editor', name, password);
    }
}