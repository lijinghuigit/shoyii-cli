import {myRequest} from '@/utill/http/request.js'
export const aboutUs=params=>{
	console.log(params)
	return myRequest({
		url:'/contactUs/getContactUsDetails',
		data:params
	})
} 
export const course=params=>{
	console.log(params)
	return myRequest({
		url:'/doct/history/getHistoryList',
		data:params
	})
} 