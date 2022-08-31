import {myRequest} from '@/utill/http/request.js'
export const expertslist=params=>{
	console.log(params)
	return myRequest({
		url:'/docOurExperts/getAllOurExperts',
		data:params,
		method:'GET'
	})
}  
export const expertsinfor=params=>{
	console.log(params)
	return myRequest({
		url:'/docOurExperts/getDetails',
		data:params,
		method:'GET'
	})
}  