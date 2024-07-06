import Cookies from 'js-cookie'
// token常量
const TOKEN_KEY   = 'token'

// 获取token
export const getCookie = ()=>{
    return Cookies.get(TOKEN_KEY)
}

// 设置token
export const setCookie = (token)=>{
    return Cookies.set(TOKEN_KEY,token)
}

// 删除token
export const removeCookie = ()=>{
    return Cookies.remove(TOKEN_KEY)
}
