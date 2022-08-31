
import {myRequest} from '@/utill/http/request.js'
// 获取新闻列表，
export const getNewsList=params=>{
	// console.log(params)
	return myRequest({
		url:'/news/getNews',
		data:params
	})
}  