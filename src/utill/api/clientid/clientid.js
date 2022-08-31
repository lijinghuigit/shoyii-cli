import {myRequest} from '@/utill/http/request.js'
export const clientId=params=>{
	console.log(params)
	return myRequest({
		url:'/doctor/bindDoctorByClientId',
		method:'POST',
		data:params,
		header:'application/x-www-form-urlencoded'
	})
} 