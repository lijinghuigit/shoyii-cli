import {myRequest} from '@/utill/http/request.js'
export const getLoginStatus=params=>{
	console.log(params)
	return myRequest({
		url:'/login/loginForApplets',
		method:'POST',
		data:params,
	})
}  