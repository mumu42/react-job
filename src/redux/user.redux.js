import axios from 'axios'
import {getRedirectPath} from "../util"
const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = '错误提示';
const LOAD_DATA = "LOAD_DATA"
const LOGOUT = "LOGOUT"
const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    type:''
};

//reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',...action.data,redirectTo:getRedirectPath(action.data)}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.data}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}
//action creator
function authSuccess(data){
    return {type:AUTH_SUCCESS,data:data}
}
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg("用户名和密码必须输入")
    }
    if(pwd!==repeatpwd){
        return errorMsg("二次密码输入不同")
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then((res)=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess({user,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg("用户名和密码必须输入")
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then((res)=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function loadData(userinfo){
    return {type:LOAD_DATA,data:userinfo}
}

export function update(data){
    return dispatch=>{
        axios.post('/user/update',data).then((res)=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function logoutSubmit(){
    return {type:LOGOUT}
}