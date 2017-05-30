const Model = require('./Model');
const ObjectID = require('mongodb').ObjectID;

class Log extends Model {
    constructor({content}) {
        super({time: Log.getUnixTimeStamp(), content});
    }

    async save() {
        const logCol = await Log.getCol('log');
        await logCol.insert(this.modelData);
    }

    valiAndLoad({time, content}) {
        this.modelData.time = time;
        this.modelData.content = content;
        return true;
    }
}

module.exports = Log;