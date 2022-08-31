import {myRequest} from '@/utill/http/request.js'
export const registerCode=params=>{
	console.log(params)
	return myRequest({
		url:'/register/getSMSCodeToRegister',
		data:params
	})
} 
 export const register=params=>{
 	console.log(params)
 	return myRequest({
 		url:'/register',
 		method:'POST',
 		data:params
 	})
 } 