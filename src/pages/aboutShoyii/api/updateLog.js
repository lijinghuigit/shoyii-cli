import {myRequest} from '@/utill/http/request.js'
export const updateLog=params=>{
	console.log(params)
	return myRequest({
		url:'/appUpdateLog/loadAll',		
		data:params
	})
}  