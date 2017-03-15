const router = require('koa-router')();
const Comment = require('../models/Comment');

router.get('/', async (ctx, next) => {
    const comments = await Comment.getByArticleId(ctx.params.articleId);
    ctx.stdResponse({data: comments});
})

router.post('/', async (ctx, next) => {
    const comment = new Comment(ctx.request.body);
    await comment.save();
    ctx.stdResponse({});
});

module.exports = router;