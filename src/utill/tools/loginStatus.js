import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
import store from '@/store/index.js'
function loginStatus(){
	// store.commit('user/logout')//修改hasLogin为false,并清除所有数据
	if(store.getters['user/hasLogin']){//用户vuex中处于登录状态
		getInfor({}).then(res=>{
			console.log('应用初始化时，检测服务端token是否过期')
			if(res.data.code==0){//
				store.commit('user/login')//修改hasLogin为true，并保存原有数据
			}else{
				store.commit('user/logout')//修改hasLogin为false,并清除所有数据
			}
		}).catch(err=>{
			console.log(err)
		})
	}
	// #ifdef MP-WEIXIN
	// uni.checkSession({
	// 	success:(e)=> {
	// 		console.log(e)
	// 	    //session_key 未过期，并且在本生命周期一直有效
	// 	},
	// 	fail:(err)=> {
	// 		console.log(err)
	// 		// session_key 已经失效，需要重新执行登录流程
	// 		// wx.login() //重新登录
	// 	}
	// })
	// #endif
}
export default loginStatus
