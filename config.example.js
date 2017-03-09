//A instance for config, need to change the name of this file to config.js
//Because a real config.js should not be pushed to CVS like git repo, that will lead to leak important secret

module.exports = {
    log : {
        //last slash required
        dir: __dirname + '/log/',
        filename: 'api.log',
    },
    mongodb: {
        url: 'mongodb://localhost:27017/PersonalBlog',
    }
}