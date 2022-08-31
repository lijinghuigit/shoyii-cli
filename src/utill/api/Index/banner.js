import {myRequest} from '@/utill/http/request.js'
export const getBanner=params=>{
	console.log(params)
	return myRequest({
		url:'/slideShow/getAppHomeSlideShows',		
		data:params
	})
}  