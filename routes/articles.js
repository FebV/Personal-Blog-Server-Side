const router = require('koa-router')();
const Article = require('../models/Article');

router.get('/', 
    async (ctx, next) => {
        const articles = await Article.getAll();
        ctx.stdResponse({data: articles});
    }
)

router.get('/:id', 
    async (ctx, next) => {
        const article = await Article.getOne({id: ctx.params.id});
        article ? ctx.stdResponse({data: article}) : ctx.stdResponse({code: 2, message: 'Not Found'});
    }
)

router.post('/', 
    async (ctx, next) => {
        const article = new Article(ctx.request.body);
        await article.save();
        ctx.stdResponse({});
    }
)
module.exports = router;