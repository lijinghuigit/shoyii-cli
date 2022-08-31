// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const doctorScan=params=>{
	console.log(params)
	return myRequest({
		url:'/token/loginForScan',
		method:'POST',
		data:params,
		header:'application/x-www-form-urlencoded'
	})
}  