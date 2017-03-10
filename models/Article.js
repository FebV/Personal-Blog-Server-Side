const Model = require('./Model');

class Article extends Model {
    constructor({title, time = getUnixTimeStamp() }) {
        super({title, time});
    }

    static async getAll() {
        const articleCol = await Article.getCol('articles');
        return await articleCol.find().toArray();
    }

    valiAndLoad({title, time}) {
        const vali = title && time;
        if(!vali)
            throw new Error('wrong format of Article');
        this.modelData.title = title;
        this.modelData.time = time;
    }

    async save() {
        const articleCol = await Article.getCol('articles');
        await articleCol.insert(this.modelData);
    }
}

function getUnixTimeStamp() {
    return Math.floor(new Date().getTime() / 1000);
}

module.exports = Article;