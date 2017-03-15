const Model = require('./Model');
const ObjectID = require('mongodb').ObjectID;

class Article extends Model {
    constructor({title, content}) {
        super({title, time: Article.getUnixTimeStamp(), content});
    }

    static async getAll() {
        const articleCol = await Article.getCol('articles');
        return await articleCol.find({}, {'title':1, 'time':1}).toArray();
    }

    static async getOne({id}) {
        if(!ObjectID.isValid(id))
            return null;
        const objId = new ObjectID(id)
        const articleCol = await Article.getCol('articles');
        return await articleCol.findOne({_id: objId});
    }

    valiAndLoad({title, time, content}) {
        const vali = title && time && content;
        if(!vali)
            throw new Error('wrong format of a Article');
        this.modelData.title = title;
        this.modelData.time = time;
        this.modelData.content = content;
    }

    async save() {
        const articleCol = await Article.getCol('articles');
        await articleCol.insert(this.modelData);
    }
}


module.exports = Article;