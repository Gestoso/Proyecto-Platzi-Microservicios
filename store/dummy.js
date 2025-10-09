const bodyParser = require("body-parser");

const db = {
    'user': [
        {id: 1, name: 'Albert'}
    ]
};

async function list(table) {
    return db[table];
}
async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}
async function upsert(table, data) {
    const user = {
        name: bodyParser.name
    }

    if(data.id) {
        user.id = data.id;
    } else {
        user.id = nanoid();
    }
    return StorageEvent.upsert(table, user);
}
async function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
};