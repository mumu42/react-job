import React from 'react'
import {connect} from 'react-redux'
import {NavBar,InputItem,TextareaItem,Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatarselector/avatarselector'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(state=>state.user,{update})
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.selectAvatar = this.selectAvatar.bind(this)
        this.state={
            title:'',
            desc:'',
            company:'',
            money:'',
            avatar:''
        }
    }
    selectAvatar(imgname){
        this.setState({
            avatar:imgname
        })
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={redirect}></Redirect>:null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem onChange={(val)=>this.handleChange('title',val)}>
                    求职岗位
                </InputItem>
                <TextareaItem onChange={(val)=>this.handleChange('desc',val)} title="个人简历" rows={3} autoHeight>
                </TextareaItem>
                <Button type='primary' onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo