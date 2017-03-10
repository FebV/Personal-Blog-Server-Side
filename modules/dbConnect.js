//module of mongodb connection object

const MongoClient = require('mongodb').MongoClient;
const url = require('./configReader')().getMongoDb('url');
let con;
const connect = async collection => {
    await MongoClient.connect(url)
    .then(
        db => {
            col = db.collection(collection);
        }
    ).catch(err => {
        console.log('connect fail');
        con = 'not work';
        //throw new Error('Connect Fail');
    });
    return con;
}

module.exports = async (collection) => {
    if(con)
        return con;
    else{
    await MongoClient.connect(url)
    .then(
        db => {
            col = db.collection(collection);
        }
    ).catch(err => {
        console.log('connect fail');
        con = 'not work';
        //throw new Error('Connect Fail');
    });
    return con;
    }
};