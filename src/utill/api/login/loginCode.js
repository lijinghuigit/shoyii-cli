// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const loginCode=params=>{
	console.log(params)
	return myRequest({
		url:'/login/loginForAndroid',
		method:'POST',
		data:params
	})
}  