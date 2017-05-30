const Model = require('./Model');
const ObjectID = require('mongodb').ObjectID;

class Comment extends Model {
    constructor({articleId, content}) {
        super({articleId, time: Comment.getUnixTimeStamp(), content});
    }

    static async getAll() {
        const commentCol = await Comment.getCol('comments');
        return await commentCol.find().toArray();
    }
    static async getByArticleId(id) {
        const commentCol = await Comment.getCol('comments');
        if(!ObjectID.isValid(id))
            throw new Error('objectId is invalid');
        const result = await commentCol.find({articleId: id}).toArray();
        return result;
    }

    valiAndLoad({articleId, time, content}) {
        const vali = articleId && time && content;
        if(!vali)
            throw new Error('wrong format of a Comment');
        this.modelData.articleId = articleId;
        this.modelData.time = time;
        this.modelData.content = content;
    }

    async save() {
        const articleCol = await Comment.getCol('comments');
        await articleCol.insert(this.modelData);
    }
}

module.exports = Comment;