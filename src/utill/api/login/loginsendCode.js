import {myRequest} from '@/utill/http/request.js'
export const loginsendCode=params=>{
	console.log(params)
	return myRequest({
		url:'/login/sendLoginVerificationCode',
		data:params
	})
}  