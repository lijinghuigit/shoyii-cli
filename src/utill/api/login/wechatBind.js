import {myRequest} from '@/utill/http/request.js' 
  export const wechatBind=params=>{
  	console.log(params)
  	return myRequest({
  		url:'/register/appBindWxToDoctorToLogin',
  		method:'POST',
  		data:params
  	})
  } 
  // 解除微信绑定
  export const cancelBind=params=>{
  	console.log(params)
  	return myRequest({
  		url:'/doctor/cancelBindWxToDoctor',
  		data:params
  	})
  } 