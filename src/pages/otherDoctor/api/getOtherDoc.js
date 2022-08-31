import {myRequest} from '@/utill/http/request.js'
export const getOtherInfor=params=>{
	return myRequest({//获取用户个人信息
		url:'/doctor/getDoctorById',
		data:params
	})
}  