const TABLA = 'auth';
const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const auth = require('../../../auth')

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username});

        bcrypt.compare(password, data.password)
        .then(isEqual => {
            if (isEqual === true) {
                return auth.sign(data); 
            } else {
                return new Error('Info Invalida');
            }
        })
        if (data.password === password) {
            return auth.sign(data);
        } else {
            throw new Error('Informacion Invalida')
        } 
    }

    async function upsert(data) {
        if (data.password === password) {
            return auth.sign(data);
        } else {
            throw new Error('Informacion Inalida')
        } 
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login
    };
};