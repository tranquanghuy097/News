var db = require('../utilities/utilities')

module.exports = {
    add: entity => {
        return db.add("news", entity);
    }
}