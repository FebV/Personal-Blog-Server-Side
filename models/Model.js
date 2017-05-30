class Model {
    constructor(data) {
        this.modelData = {};
        this.valiAndLoad(data);
        return new Proxy(this, {
            set: (target, property, value) => {
                target.modelData[property] = value;
                console.log(`trigger set on ${target} ${property}`);
                return true;
            },
            get: (target, property) => {
                if(property == 'modelData')
                    return target.modelData;
                //console.log(`trigger get on ${target} ${property}`);
                if(target[property])
                    return target[property];
                return target.modelData[property];
            }
        })
    }

    static async getCol(col) {
        const db = require('../modules/dbConnect');
        return await db(col);
    }

    async save() {
    }

    static getUnixTimeStamp() {
        return Math.floor(new Date().getTime() / 1000);
    }
}

module.exports = Model;