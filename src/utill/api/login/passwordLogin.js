// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const passwordLogin=params=>{
	console.log(params)
	return myRequest({
		url:'/token/loginForAndroid',
		method:'POST',
		data:params
	})
}  