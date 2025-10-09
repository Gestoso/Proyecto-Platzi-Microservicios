const auth = require('../auth')
const TABLE = 'user'; 

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }   
    function list() {
    return store.list(TABLE);
    }
    function get(id) {
    return store.list(TABLE, id);
    }

    async function upsert(data) {
        const { nanoid } = await import('nanoid');

        const user = {
            name: data.name,
            username: data.username
        }
        if (user.id) {
            user.id = data.id;
        }  else {
            user.id = nanoid();
        }
        if (data.password ||data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            })
        }
        return store.upsert(TABLE, data)
    }
    
    return {
        list,
        get,
        upsert
    };
}
