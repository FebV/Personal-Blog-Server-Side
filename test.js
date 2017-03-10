let con = require ('./modules/dbConnect');

let art = async () => {
    try{
        const article = await con('article');
        console.log(await article.find().toArray());
    } catch(e) {
        console.log('something wrong');
    }
}
// art();
console.log('end');