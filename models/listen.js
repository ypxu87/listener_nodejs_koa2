const mongoose = require('mongoose');

var ListenSchema = new mongoose.Schema({
    type : { type: String, required: true},  //recommend:推荐内容    hotspot：热点内容
    photo : { type: String, required: true},
    title : { type: String, required: true},
    content : { type: String, required: true },
    audio : { type: String, required: true },
    create_time: { type: Date, default: Date.now }
})

ListenSchema.statics.getSourceList = async function (type) {
    let list = []
    if(type == "all"){
        list = await this.find({},{content:0,audio:0})
    }else{
        list = await this.find({type:type},{content:0,audio:0})
    }
    return list;
}

ListenSchema.statics.getDetail = async function (sourceId) {
    let detailInfo = await this.findOne({_id:sourceId})
    return detailInfo;
}

module.exports = ListenSchema;