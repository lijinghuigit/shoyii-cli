import {myRequest} from '@/utill/http/request.js'
export const querydevice=params=>{
	console.log(params)
	return myRequest({
		url:'/deviceGroup/getDevices',
		data:params
	})
}  