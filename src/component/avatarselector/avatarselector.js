import React from 'react'
import {Grid,List} from 'antd-mobile'
class AvatarSelector extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const avatarList = ['boy','bull','chick','crab','girl','hedgehog','hippopotamus','koala','lemur','man','pig','tiger','whale','woman','zebra']
            .map((v)=>(
            {
                icon: require(`../img/${v}.png`),
                text: v,
            }
        ))
        const gridHeader= this.state.ele?(<div><span>已选择头像</span><img src={this.state.ele.icon} alt="" style={{width:20}}/></div>):(<div>请选择头像</div>)
        return (
            <div>
                <List renderHeader={gridHeader}>
                    <Grid data={avatarList} columnNum={5}
                          onClick={
                              ele=>{this.setState({ele})
                              this.props.selectAvatar(ele.text)}
                          }>

                    </Grid>
                </List>
            </div>
        )
    }
}
export default AvatarSelector