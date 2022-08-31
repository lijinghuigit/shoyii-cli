import {myRequest} from '@/utill/http/request.js'
export const getcasedetail=params=>{
	console.log(params)
	return myRequest({
		url:'/caseHistory/getDetail',
		data:params
	})
}  