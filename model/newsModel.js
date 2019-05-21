var db = require('../utilities/utilities')

module.exports = {
    loadbySub: subcategory => {
        return db.load(`select * from news where subcategory = ${subcategory}`);
    }
}