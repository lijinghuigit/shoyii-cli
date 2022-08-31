// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const getTraindata=params=>{//获取培训的数据
	console.log(params)
	return myRequest({
		url:'/train/loadAll',
		data:params
	})
}
export const sendTrain=params=>{//培训报名
	console.log(params)
	return myRequest({
		url:'/train/signUp',
		data:params,
		method:'POST',
	})
}
export const getReportInfor=params=>{//获取报名信息
	console.log(params)
	return myRequest({
		url:'/train/getSignUpMessage',
		data:params
	})
}
export const amendInfor=params=>{//获取报名信息
	console.log(params)
	return myRequest({
		url:'/train/updateSignUpMessage',
		data:params,
		method:'POST',
	})
}
export const getsingleInfor=params=>{//获取报名信息的详情
	console.log(params)
	return myRequest({
		url:'/train/getSingleSignUpMessage',
		data:params,
	})
}

