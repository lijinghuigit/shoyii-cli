// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const deleteDevice=params=>{
	console.log(params)
	return myRequest({
		url:'/device/unBind',
		data:params
	})
} 