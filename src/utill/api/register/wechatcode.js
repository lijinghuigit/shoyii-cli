import {myRequest} from '@/utill/http/request.js'
export const wechatcode=params=>{
	console.log(params)
	return myRequest({
		url:'/login/getSMSCodeByWxTelephone',
		data:params
	})
}  