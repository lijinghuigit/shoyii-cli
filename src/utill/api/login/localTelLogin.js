
// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
// 获取本地手机号码登录注册
export const localTelLogin=params=>{
	console.log(params)
	return myRequest({
		url:'/login/oneClickLoginForAndroid',
		data:params,
		method:'POST',
		header:'application/x-www-form-urlencoded'
	})
}