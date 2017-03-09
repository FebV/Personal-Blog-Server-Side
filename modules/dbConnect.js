//module of mongodb connection object

const MongoClient = require('mongodb').MongoClient;
const url = require('./configReader')().getMongoDb('url');
const con = MongoClient.connect(url);
module.exports = async function(collection) {
    let col = null;
    await con.then(
        db => {
            col = db.collection(collection);
        }
    ).catch(err => {
        throw new Error('Connect Fail');
    })
    return col;
};