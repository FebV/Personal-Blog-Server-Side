class Model {
    constructor(data) {
        this.modelData = {};
        this.valiAndLoad(data);
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