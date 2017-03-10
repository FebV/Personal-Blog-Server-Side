let con = require ('./modules/dbConnect');

let art = async () => {
    console.log(await con());
}
art();

let con2 = require ('./modules/dbConnect');
let art2 = async() => {
    console.log(await con2());
}
setTimeout(() => {
    art2();
}, 2000);