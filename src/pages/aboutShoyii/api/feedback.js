import {myRequest} from '@/utill/http/request.js'
export const feedback=params=>{
	console.log(params)
	return myRequest({
		url:'/feedback/add',
		data:params,
		method:'POST'
	})
}  