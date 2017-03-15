const router = require('koa-router')();
const Comment = require('../models/Comment');

router.get('/', async (ctx, next) => {
    const comments = await Comment.getByArticleId(ctx.params.articleId);
    ctx.stdResponse({data: comments});
})

router.post('/', async (ctx, next) => {
    const obj = Object.assign({}, ctx.params, ctx.request.body);
    const comment = new Comment(obj);
    await comment.save();
    ctx.stdResponse({});
});

module.exports = router;