var db = require('../utilities/utilities')

module.exports = {
    add: entity => {
        return db.add("news", entity);
    },

    byID: id => {
        return db.load(`select * from news where id = ${id}`);
    },

    loadsubCat: () => {
        return db.load('select * from subcategory')
    },

    update: entity => {
        return db.update('news', 'id', entity);
    },

    loadnews: () => {
        return db.load('select * from news');
    }
}