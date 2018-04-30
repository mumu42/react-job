import React from 'react'
import Logo from '../../component/logo/logo'
import { WingBlank, WhiteSpace ,List,InputItem,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom'

@connect(state=>{
    return state.user
},{register})
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(val)=>this.handleChange('user',val)}>用户名</InputItem>
                        <InputItem type="password" onChange={(val)=>this.handleChange('pwd',val)}>密码</InputItem>
                        <InputItem type="password" onChange={(val)=>this.handleChange('repeatpwd',val)}>确认密码</InputItem>
                        <RadioItem checked={this.state.type==='genius'} onChange={()=>this.handleChange('type',"genius")}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type==='boss'} onChange={()=>this.handleChange('type',"boss")}>
                            BOSS
                        </RadioItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.handleRegister}>注册</Button>
                        {this.props.msg?(<List.Item className="Item">{this.props.msg}</List.Item>) :null}
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Register;