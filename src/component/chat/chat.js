import React from 'react'
import {List,InputItem,NavBar,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,recvMsg,getMsgList,readMsg} from "../../redux/chat.redux";
import io from 'socket.io-client'
import {getChatId} from '../../util'

const socket = io('ws://120.78.90.148:80');
@connect(state=>state,{
    sendMsg,recvMsg,getMsgList,readMsg
})
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            msg:[]
        };
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.recvMsg();
            this.props.getMsgList();
        }
    }
    componentWillUnmount(){
        const to = this.props.match.params.user;
        this.props.readMsg(to)
    }
    handleSubmit(){
        this.props.sendMsg({
            from:this.props.user._id,
            to:this.props.match.params.user,
            msg:this.state.text
        });
        this.setState({
            text:''
        })
    }

    render(){
        const to = this.props.chat.users[this.props.match.params.user];
        const me = this.props.chat.users[this.props.user._id];
        if(!to||!me){
            return null;
        }
        const toAvatar = require(`../img/${to.avatar}.png`);
        const meAvatar = require(`../img/${me.avatar}.png`);
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==getChatId(this.props.match.params.user,this.props.user._id))
        return (
            <div id="chat-page">
                <NavBar
                    mode='dark'
                    icon={(<Icon type="left"/>)}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >{to.name}</NavBar>
                {chatmsg.map(v=>{
                    return v.from==this.props.user._id?(<List key={v._id}>
                        <List.Item
                        thumb={meAvatar}
                        >{v.content}</List.Item>
                    </List>):(<List key={v._id}>
                        <List.Item
                            className="chat-me"
                            extra={<img src={toAvatar} alt=""/>}
                        >{v.content}</List.Item>
                    </List>)
                })}

                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                            value={this.state.text}
                            onChange={v=>this.setState({text:v})}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat;