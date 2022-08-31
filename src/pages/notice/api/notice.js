import {myRequest} from '@/utill/http/request.js'
// 获取新闻列表，
export const getNoticeDetail=params=>{
	console.log(params)
	return myRequest({
		url:'/Message/getMessageContentList',
		data:params
	})
}  
export const getNotice=params=>{
	console.log(params)
	return myRequest({
		url:'/Message/getMessageUserList',
		data:params
	})
}  