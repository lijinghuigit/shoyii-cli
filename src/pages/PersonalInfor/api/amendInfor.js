import {myRequest} from '@/utill/http/request.js'
export const amend=params=>{
	// console.log(params)
	return myRequest({
		url:'/doctor/modify',
		method:'POST',
		data:params
	})
}  
export const getDepartments=params=>{
	// console.log(params)
	return myRequest({
		url:'/diseaseCategory/getAllDepartments',
		data:params
	})
} 
