import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import {recvMsg,getMsgList} from "../../redux/chat.redux";


@connect(state=>state,{
   recvMsg,getMsgList
})
class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.recvMsg();
            this.props.getMsgList();
        }
    }
    render(){
        const {pathname} = this.props.location;
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:this.props.user.type === 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:this.props.user.type ==='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                component:Msg,
                title:'消息列表'
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                component:User,
                title:'个人中心'
            }
        ]
        const head = navList.find(v=>v.path===pathname);
        if(!head){
            return null
        }
        return(
            <div>
                <NavBar mode='dark' className='fixd-header'>{head.title}</NavBar>
                <div style={{marginTop:45,marginBottom:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route path={v.path} component={v.component} key={v.path}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default  Dashboard