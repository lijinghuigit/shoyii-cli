// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
   export const wechatLogin=params=>{
   	console.log(params)
   	return myRequest({
   		url:'/login/loginAndroidForWx',
   		method:'POST',
   		data:params
   	})
   }