import {myRequest} from '@/utill/http/request.js'
export const vrGroup=params=>{
	console.log(params)
	return myRequest({
		url:'/device/addLoadInstructions',
		method:'POST',
		data:params
	})
}  