//module of mongodb connection object

const MongoClient = require('mongodb').MongoClient;
const url = require('./configReader')().getMongoDb('url');

const connect = (async () => {
    let con;
    try{
        con = await MongoClient.connect(url)
        return con;
    } catch(e) {
        throw new Error('fail to connect to MongoDB');
    }
})();

module.exports = async (col) => {
    let con = await connect;
    return con.collection(col)
}