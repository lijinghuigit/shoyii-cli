// #ifndef APP-NVUE
import store from '@/store/index.js'
// #endif
function checkLogin(url,type){//backpage为返回的页面，backtype为返回的页面跳转类型
	let token=''
	// #ifndef APP-NVUE
	token=store.getters['user/info'].token
	// #endif
	// #ifdef APP-NVUE
	token=uni.getStorageSync('userInfo').token
	// #endif
	if(!token){
		uni.showModal({
			title:'未登录',
			content:'用户未登录',
			confirmText:'前去登录',
			success(e){   
				console.log(e)
				if(e.confirm){//点击确定
					uni.navigateTo({//1表示switchTab
						url:'/pages/login/tellogin?pages='+url+'&pagetype='+type,
						animationType:'pop-in'
					})
				}	
			},
		})
		return false;
	}
	return [token]
}
export default checkLogin
	
	