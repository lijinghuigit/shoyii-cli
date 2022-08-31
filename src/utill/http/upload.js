// #ifndef APP-NVUE
import store from '@/store/index.js'
// #endif
import {requestUrl} from '../baseUrl/baseurl.js'
const BASE_URL=requestUrl
let token=''
export const uploadRequest = (options) => {//options为调用该方法时传过来的数据
		  // #ifndef APP-NVUE
		  token=store.getters['user/info'].token //卸载外面会有缓存，可能不会触发该token
		  // #endif
		  // #ifdef APP-NVUE
		  token=uni.getStorageSync('userInfo').token
		  // #endif
		  return new Promise((resolve,reject)=>{
		  	// 这块可以去做post或get的不同处理
		  	// if(options.method==='GET'){
				// 将下列request请求放进去}
		  	uni.uploadFile({
		  		url:BASE_URL+options.url,
		  		method:options.method || 'POST',//不传的话，默认是GET	
		  		// data:options.data||{},//不传的话，默认是个空对象
				filePath: options.filePath,
				name: options.name || 'file',//注意是file还是files
		  		// 不需要传token
				header:{
		  			// 'Content-Type':'application/json;charset=UTF-8',//默认//对于 POST 方法且 header['content-type'] 为 application/json 的数据，会进行 JSON 序列化。
		  			// 'Content-Type':'application/x-www-form-urlencoded',//会将数据转换为 query string。
		  			"token":token
		  		},
		  		withCredentials:true,//是否携带凭证
		  		success:(res)=> {
		  			//通过res去判断数据状态，再进行下一步操作
		  			// if(res.data.code!==0){
		  			// 	return uni.showToast({
		  			// 		title:res.data.msg,
		  			// 		icon:"none"
		  			// 	})
		  			// }
		  			resolve(res)//返回数据
		  		},
		  		fail: (err) => {//数据请求失败
		  			uni.showToast({
		  				title:'数据请求失败',
						icon:"none"
		  			})
		  			reject(err)//返回错误信息
		  		},
		  		complete: (response) => {
		  			// 这可以做加载的隐藏
		  			// console.log(response)
		  			if(response.statusCode==401){//未登录
		  				console.log('未登录')
						uni.showToast({
							title:'验证信息过期，重新登陆',
							icon:none
						})
		  				// uni.navigateTo({
		  				// 	url: '/pages/login/login' 
		  				// });
		  			}
		  		}
		  	})
		  })
	  // }
	  // else{
		 //  console.log('未登录')
	  // }
}