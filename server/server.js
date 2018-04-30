const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const Chat = require('./model').getModel('chat');

app.use(cookieParser())
app.use(bodyParser());
app.use('/user',userRouter)

io.on('connection', (socket)=>{
    socket.on('sendmsg',(data)=>{
        const {from ,to ,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from ,to,content:msg,'create_time':new Date().getTime()},(err,doc)=>{
            if(!err){
                io.emit('recvmsg',doc)
            }
        })

    })
});

server.listen(80,()=>{
    console.log('node app start at port 8888')
});