// if(process.env.NODE_ENV === 'production'){
//     // 生产环境
//     BASE_URL = 'http://' + window.location.host + '/net'
// }else if(process.env.NODE_ENV === 'development'){
//     // 开发环境
//     BASE_URL = "https://doctor.shoyii.com"
// }else{
	// BASE_URL = "https://doctor.shoyii.com"
	// }
// 引入错误提示
// import {errdata} from './errTip.js'
// console.log(errdata.errlist)
// #ifndef APP-NVUE
import store from '@/store/index.js'
// #endif
import {uploadUrl} from '../baseUrl/baseurl.js'
const BASE_URL=uploadUrl
let token=''
export const myCos = (options) => {//options为调用该方法时传过来的数据
		// #ifndef APP-NVUE
		token=store.getters['user/info'].token //卸载外面会有缓存，可能不会触发该token
		// #endif
		// #ifdef APP-NVUE
		token=uni.getStorageSync('userInfo').token
		// #endif
	  // if(token){
		  return new Promise((resolve,reject)=>{
		  	// 这块可以去做post或get的不同处理
		  	// if(options.method==='GET'){
				// 将下列request请求放进去}
		  	uni.request({
		  		url:BASE_URL+options.url,
		  		method:options.method || 'GET',//不传的话，默认是GET	,顺序不要颠倒
		  		data:options.data||{},//不传的话，默认是个空对象	
		  		header:{
		  			'Content-Type':options.header || 'application/json;charset=UTF-8',//默认//对于 POST 方法且 header['content-type'] 为 application/json 的数据，会进行 JSON 序列化。
		  			// 'Content-Type':'application/x-www-form-urlencoded',//会将数据转换为 query string。
		  			"token":token
		  		},
		  		withCredentials:true,//是否携带凭证
				// dataType:'json',
		  		// timeout:3000,
		  		success:(res)=> {
		  			// console.log(res)
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
					// 错误提示
					// errdata.errlist(err)
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
		  			}else if(response.statusCode==404){//页面不存在(或者接口不存在)
						// uni.navigateTo({
						// 	url:'/pages/errpage/errpage'
						// })
					}
		  		}
		  	})
		  })
	  // }
	  // else{
		 //  console.log('未登录')
	  // }
}