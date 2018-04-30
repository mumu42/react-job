const express = require('express')
const Router = express.Router();
const utils = require('utility');
const User = require('./model').getModel('user');
const Chat = require('./model').getModel('chat');
Router.get('/remove',(req,res)=>{
    // Chat.remove({},(e,d)=>{
    //     res.json({code:0})
    // })
    // User.remove({},(e,d)=>{
    //     res.json({code:0})
    // })
})
Router.get('/info',(req,res)=>{
    //用户有没有cookie
    const {userid} = req.cookies;
    if(!userid){
        res.json({code:1})
    }
    User.findOne({_id:userid},{pwd:0,__v:0},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })

})
//方便查看数据库信息
Router.get('/list',(req,res)=>{
    // User.remove({},(e,d)=>{})
    const {type} = req.query;
    User.find({type},(err,doc)=>{
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',(req,res)=>{
    const {user,pwd,type} = req.body;
    User.findOne({user},(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        User.create({user,pwd:md5Pwd(pwd),type},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:"后端出错了"})
            }
            const _id = doc._id;
            //_id写入cookie
            res.cookie('userid',_id);
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})
Router.post('/login',(req,res)=>{
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},{pwd:0,__v:0},(err,doc)=>{
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        //_id写入cookie
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc})
    })
})

Router.post('/update',(req,res)=>{
    //用户有没有cookie
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1})
    }
    User.findByIdAndUpdate(userid,req.body,(err,doc)=>{
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },req.body)
        return res.json({code:0,data})
    })
})

Router.get('/getMsgList',(req,res)=>{
    const userid = req.cookies.userid;
    User.find({},(e,userdoc)=>{
        let users={};
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:userid},{to:userid}]},(err,doc)=>{
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })

})
Router.post('/readMsg',(req,res)=>{
    const userid = req.cookies.userid;
    const {from} = req.body;
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        (err,doc)=>{
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:"修改失败"})
        }
    )
})

function md5Pwd(pwd){
    const salt='china_soft_good+7987@#%*``dsYTF4';
    return utils.md5(utils.md5(salt+pwd+salt));
}
module.exports = Router