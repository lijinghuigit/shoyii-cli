// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
// 获取验证码(新旧都是)
export const getcode=params=>{
	console.log(params)
	return myRequest({
		url:'/register/getSMSCodeToUpdateTel',
		data:params
	})
}  
// 旧手机号的验证
export const oldVertify=params=>{
	console.log(params)
	return myRequest({
		url:'/register/UpdateOldTelVerify',
		data:params
	})
} 
// 新手机号的验证
export const newVertify=params=>{
	console.log(params)
	return myRequest({
		url:'/register/UpdateNewTelVerify',
		data:params
	})
} 
