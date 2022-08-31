// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const getInfor=params=>{
	return myRequest({//获取用户个人信息
		url:'/doctor/getDetails',
		data:params
	})
} 