// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const miniBind=params=>{
	console.log(params)
	return myRequest({
		url:'/register/appletsBindWxToDoctor',
		method:'POST',
		data:params
	})
}  
export const miniGetuserInfor=params=>{
	console.log(params)
	return myRequest({
		url:'/register/saveWxUser',
		data:params,
		method:'POST',
	})
}  