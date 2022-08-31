import {myRequest} from '@/utill/http/request.js'
export const getCaselist=params=>{
	console.log(params)
	return myRequest({
		url:'/caseHistory/getCaseHistoryList',
		data:params
	})
}  