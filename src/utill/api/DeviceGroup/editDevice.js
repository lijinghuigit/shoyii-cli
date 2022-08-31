import {myRequest} from '@/utill/http/request.js'
export const editDevice=params=>{
	console.log(params)
	return myRequest({
		url:'/device/modify',
		method:'POST',
		data:params
	})
}  