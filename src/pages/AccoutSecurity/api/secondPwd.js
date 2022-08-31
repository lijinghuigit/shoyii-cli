import {myRequest} from '@/utill/http/request.js'
// 发送二级密码的验证码
export const secondCode=params=>{
	console.log(params)
	return myRequest({
		url:'/register/sendSecondLevelPasswordSMS',
		data:params
	})
} 
// 校验验证码
 export const vertifyCode=params=>{
 	console.log(params)
 	return myRequest({
 		url:'/register/checkSecondLevelPasswordSMS',
 		data:params,
		// header:'application/x-www-form-urlencoded'
 	})
 } 
 // 设置二级密码
 export const setSecondPwd=params=>{
 	console.log(params)
 	return myRequest({
 		url:'/doctor/secondLevelPasswordSwitch',
 		data:params,
 		method:'POST'
 	})
 } 
 // 获取验证码(新旧都是)
 export const amendPwd=params=>{
 	console.log(params)
 	return myRequest({
 		url:'/register/UpdatePwByOldPw',
 		data:params,
 		method:'POST'
 	})
 }  