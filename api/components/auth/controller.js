const nanoid = require('nanoid');
const bycrypt = require("bcrypt");

const auth = require("../../../auth");
const TABLA = "auth";


module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    async function logging(userName, password){
        const data = await store.query(TABLA, {username:userName});
        const info = await bycrypt.compare(password, data.password);
        if(info){
            return auth.sign(data);
        }else{
            throw new Error("Informacion invalida");
        }

    }
  async  function upsert(data) {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bycrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        logging
    };
};