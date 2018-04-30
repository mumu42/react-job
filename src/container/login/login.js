import React from 'react'
import Logo from '../../component/logo/logo'
import { WingBlank, WhiteSpace ,List,InputItem,Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'

@connect(state=>state.user,{login})
class Login extends React.Component{
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.state={
            user:'',
            pwd:''
        }
    }
    register(){
        this.props.history.push('/register')
    }
    handleLogin(){
        this.props.login(this.state)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        return(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(val)=>this.handleChange('user',val)}>用户名</InputItem>
                        <InputItem type="password" onChange={(val)=>this.handleChange('pwd',val)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
                {this.props.msg?(<List.Item className="Item">{this.props.msg}</List.Item>) :null}
            </div>
        )
    }
}
export default Login;