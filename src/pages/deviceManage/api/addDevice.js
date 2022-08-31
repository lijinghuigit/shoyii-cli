import {myRequest} from '@/utill/http/request.js'
export const addDevice=params=>{
	console.log(params)
	return myRequest({
		url:'/device/add',
		method:'POST',
		data:params
	})
}  