//module of mongodb connection object

//this module can hold the singleton connection

const MongoClient = require('mongodb').MongoClient;
const url = require('./configReader')().getMongoDb('url');

const connect = (async () => {
    try{
        const con = await MongoClient.connect(url)
        return con;
    } catch(e) {
        throw new Error('fail to connect to MongoDB');
    }
})();

module.exports = async (col) => {
    try{
        const con = await connect;
        return con.collection(col)
    }catch(e) {
        throw e;
    }
}