let con = require ('./modules/dbConnect');
let A = require('./models/Article');
let f = require('fs');

let art = async () => {
    try{
        const article = await con('articles');
        const a = new A({
            title: `本网站技术架构`,
            content: f.readFileSync('article.md', 'utf-8')
        });
        await a.save();
        // console.log(await article.find().toArray());
    } catch(e) {
        console.log('something wrong');
    }
}
art();