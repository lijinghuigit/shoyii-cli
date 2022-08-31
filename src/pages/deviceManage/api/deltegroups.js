import {myRequest} from '@/utill/http/request.js'
export const deltegroups=params=>{
	console.log(params)
	return myRequest({
		url:'/deviceGroup/delete',
		data:params
	})
} 