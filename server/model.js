const mongoose = require('mongoose');
const DB_URL = 'mongodb://172.18.7.44/chat';
mongoose.connect(DB_URL);
const models = {
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        //头像
        'avatar':{'type':String},
        //个人简历或者职位介绍
        'desc':{'type':String},
        //职位
        'title':{'type':String},
        //如果你是boss，还有两个字段
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        'content':{'type':String,'require':true,default:''},
        'create_time':{'type':Number,'require':true},
        'read':{'type':Boolean,default:false},
        'chatid':{'type':String,'require':true}
    }
}
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

mongoose.connection.on('connected',()=>{
    console.log('mongo connect success')
})

module.exports={
    getModel:function(name){
        return mongoose.model(name)
    }
}