import {myRequest} from '@/utill/http/request.js'
export const getgroupDevice=params=>{
	console.log(params)
	return myRequest({
		url:'/device/getGroupDevices',
		data:params
	})
} 