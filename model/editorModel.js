var db = require('../utilities/utilities')

module.exports = {
    add: entity => {
        return db.add("editor", entity);
    },
}