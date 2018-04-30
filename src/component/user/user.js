import React from 'react'
import { Result, WhiteSpace,List } from 'antd-mobile';
import {connect} from 'react-redux'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {logoutSubmit} from '../../redux/user.redux'
@connect(state=>state.user,{logoutSubmit})
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        browserCookie.erase('userid');
        this.props.logoutSubmit()
    }
    render(){
        return this.props.user?(
            <div>
                <Result
                    img={<img src={require(`../img/${this.props.avatar}.png`)} alt="" style={{width:50}}/>}
                    title={this.props.user}
                    message={this.props.type==='boss'?this.props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <List.Item>
                        {this.props.title}
                        {this.props.desc.split('\n').map(
                            d=>(
                                <List.Item.Brief key={d}>{d}</List.Item.Brief>
                            )
                        )}
                        {this.props.money?<List.Item.Brief>薪资:{this.props.money}</List.Item.Brief>:null}
                    </List.Item>
                </List>
                <WhiteSpace />
                <List type='primary'>
                    <List.Item onClick={this.logout}>
                        退出登录
                    </List.Item>
                </List>
            </div>
        ):(<Redirect to={this.props.redirectTo}/>)
    }
}

export default User;