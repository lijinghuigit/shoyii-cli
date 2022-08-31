import {myRequest} from '@/utill/http/request.js'
export const addgroups=params=>{
	console.log(params)
	return myRequest({
		url:'/deviceGroup/saveOrUpdate',
		method:'POST',
		data:params
	})
}  