const mongoose =  require('mongoose-q')(require('mongoose'));
const config = require('../config');
const ListenSchema = require('./listen')

// 数据库
require('mongoose').Promise = global.Promise

let mongodb = `mongodb://${config.mongodb.host}/${config.mongodb.database}`
if(config.mongodb.user)
    mongodb = `mongodb://${config.mongodb.user}:${config.mongodb.pass}@${config.mongodb.host}/${config.mongodb.database}`
mongoose.connect(mongodb, {
    server: {
        poolSize: 10
    }
}, (err) => {
    if(err) {
        console.error(err);
    }
});
mongoose.model('listen', ListenSchema);
module.exports = function (name) {
    name = name.toLowerCase();
    return mongoose.model(name);
}